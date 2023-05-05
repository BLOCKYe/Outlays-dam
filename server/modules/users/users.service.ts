/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 20:02
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../utils/Error/Error";
import UsersRepository from "./users.repository";
import * as bcrypt from "bcrypt";
import Jwt from "../../utils/jwt/jwt";
import AuthRepository from "../auth/auth.repository";
import * as uuid from "uuid";
import AuthMiddleware from "../../utils/middlewares/auth.middleware";
import MailService, { MailResponseStatuses } from "../../services/MailService";
import type { User } from ".prisma/client";
import PasswordValidator from "../../utils/validator/PasswordValidator";
import EmailValidator from "../../utils/validator/EmailValidator";
import StringValidator from "../../utils/validator/StringValidator";
import type { JwtPayload } from "jsonwebtoken";
import type { IUser } from "./IUsers";

export default class UsersService {
  private readonly usersRepository: UsersRepository;
  private readonly jwt: Jwt;
  private readonly authRepository: AuthRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.jwt = new Jwt();
    this.authRepository = new AuthRepository();
  }

  /**
   * This method is used to
   * sign-in user
   * @param req
   * @param res
   */

  public async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, password } = req.body;

      await new EmailValidator(res, true).validate(email);
      await new PasswordValidator(res, true).validate(password);

      // check if user already exists
      const existingUser: IUser = await this.usersRepository.findUserByEmail(
        email
      );

      if (!existingUser) {
        return Error.res(res, 403, "The account does not exist.");
      }

      // validate password
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!validPassword) {
        return Error.res(res, 400, "Invalid password.");
      }

      // validate verify status
      if (!existingUser.isVerified) {
        return Error.res(res, 403, "Account is not verified.");
      }

      // sing-in user
      const jti = uuid.v4();
      const { accessToken, refreshToken } = this.jwt.generateTokens(
        existingUser,
        jti
      );

      await this.authRepository.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      return res.status(200).json({
        status: 200,
        data: {
          accessToken,
          refreshToken,
          config: { defaultSection: existingUser?.config?.defaultSection },
        },
      });
    } catch (err) {
      console.log(err);
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * register new user
   * @param req
   * @param res
   */
  public async register(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, password, name } = req.body;

      // validate body
      await new EmailValidator(res, true).validate(email);
      await new PasswordValidator(res, true).validate(password);
      await new StringValidator(res, true, 1, 50).validate(name);

      // check if user already exists
      const existingUser: IUser = await this.usersRepository.findUserByEmail(
        email
      );

      if (existingUser) {
        return Error.res(res, 400, "Email already in use.");
      }

      // create user
      const user: User =
        await this.usersRepository.createUserByEmailAndPassword({
          email,
          password,
          name,
        });

      // send mail with verification link
      const mailService = new MailService(
        "kontakt@dominikobloza.pl",
        user.email,
        "Outlays Dam - aktywacja konta.",
        `Ten email został użyty do utworzenia konta na platformie Outlays Dam, wejdź w ten link aby aktywować konto: ${process.env.NEXT_PUBLIC_BACKEND_API}/verify?verifyKey=${user.id}`
      );
      const mailResponse = await mailService.sendMail();

      if (mailResponse !== MailResponseStatuses.SUCCESS) {
        return Error.res(res, 400, "Failed to send verification link.");
      }

      // generate token
      const jti = uuid.v4();
      const { accessToken, refreshToken } = this.jwt.generateTokens(user, jti);
      await this.authRepository.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: user.id,
      });

      return res
        .status(200)
        .json({ status: 200, data: { accessToken, refreshToken } });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get user data
   * @param req
   * @param res
   */
  public async profile(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload: void | JwtPayload = await AuthMiddleware.isAuthenticated(
        req,
        res
      );
      if (!payload) return;

      const { userId } = payload;
      const user: IUser = await this.usersRepository.findUserById(userId);

      // check if user already exists
      if (!user) {
        return Error.res(res, 401, "The user does not exist.");
      }
      user.password = "";

      return res.status(200).json({ status: 200, data: { user } });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * verify user account
   * @param req
   * @param res
   * @param verifyKey
   */
  public async verify(
    req: NextApiRequest,
    res: NextApiResponse,
    verifyKey: string
  ) {
    try {
      if (!verifyKey) {
        return Error.res(res, 400, "Invalid verify key.");
      }

      // check if user has verified account
      const existingUser: IUser = await this.usersRepository.findUserById(
        verifyKey
      );

      if (!existingUser) {
        return Error.res(res, 400, "The user does not exist.");
      }

      if (existingUser?.isVerified) {
        return Error.res(res, 400, "Account is already verified.");
      }

      // verify account
      const user: User = await this.usersRepository.verifyUser(existingUser.id);

      return res.status(200).json({ status: 200, data: user });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * update user details
   * @param req
   * @param res
   */
  public async updateDetails(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      const { userId } = payload;

      const { name } = req.body;

      await new StringValidator(res, true, 1, 50).validate(name);
      const user: User = await this.usersRepository.updateProfile(userId, name);
      user.password = "";

      return res.status(200).json({ status: 200, data: { user } });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }
}

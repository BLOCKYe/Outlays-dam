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
import * as yup from "yup";
import MailService from "../../services/MailService";

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

      // validate body
      const emailSchema = yup.string().email().required();
      if (!(await emailSchema.isValid(email)))
        return Error.res(res, 400, "Invalid email field");

      const passwordSchema = yup.string().min(5).required();
      if (!(await passwordSchema.isValid(password)))
        return Error.res(
          res,
          400,
          "The password should contain at least 5 characters"
        );

      // check if user already exists
      const existingUser: any = await this.usersRepository.findUserByEmail(
        email
      );
      if (!existingUser)
        return Error.res(res, 403, "Invalid login credentials.");

      // validate password
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) return Error.res(res, 400, "Invalid password.");

      // validate verify status
      if (!existingUser.isVerified)
        return Error.res(res, 403, "Account is not verified.");

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

      return res
        .status(200)
        .json({ status: 200, data: { accessToken, refreshToken } });
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
      const emailSchema = yup.string().email().required();
      if (!(await emailSchema.isValid(email)))
        return Error.res(res, 400, "Invalid email field");

      const passwordSchema = yup.string().min(5).required();
      if (!(await passwordSchema.isValid(password)))
        return Error.res(
          res,
          400,
          "The password should contain at least 5 characters"
        );

      const nameSchema = yup.string().min(3).max(32).required();
      if (!(await nameSchema.isValid(name)))
        return Error.res(res, 400, "Invalid name field");

      // check if user already exists
      const existingUser = await this.usersRepository.findUserByEmail(email);
      if (existingUser) return Error.res(res, 400, "Email already in use.");

      // create user
      const user: any = await this.usersRepository.createUserByEmailAndPassword(
        {
          email,
          password,
          name,
        }
      );

      const mailService = new MailService(
        "kontakt@dominikobloza.pl",
        user.email,
        "Outlays Dam - aktywacja konta.",
        `Ten email został użyty do utworzenia konta na platformie Outlays Dam, wejdź w ten link aby aktywować konto: ${process.env.NEXT_PUBLIC_BACKEND_API}/verify?verifyKey=${user.id}`
      );
      mailService.sendMail();

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
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;

      const { userId } = payload;
      const user: any = await this.usersRepository.findUserById(userId);

      // check if user already exists
      if (!user) return Error.res(res, 400, "The user does not exist.");

      delete user.password;
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
   */

  public async verify(
    req: NextApiRequest,
    res: NextApiResponse,
    verifyKey: string
  ) {
    try {
      if (!verifyKey) return Error.res(res, 400, "Invalid verify key.");

      // check if user has verified account
      const existingUser = await this.usersRepository.findUserById(verifyKey);

      if (!existingUser) return Error.res(res, 400, "The user does not exist.");

      if (existingUser?.isVerified)
        return Error.res(res, 400, "Account is already verified.");

      // verify account
      const user = await this.usersRepository.verifyUser(
        existingUser?.id,
        true
      );

      return res.status(200).json({ status: 200, data: user });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }
}

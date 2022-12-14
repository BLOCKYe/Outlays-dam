/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 20:02
*/

import {NextApiRequest, NextApiResponse} from "next";
import Error from "../../utils/Error/Error";
import UsersServices from "./users.services";
import * as bcrypt from "bcrypt";
import Jwt from "../../utils/jwt/jwt";
import AuthServices from "../auth/auth.services";
import * as uuid from "uuid";
import AuthMiddleware from "../../utils/middlewares/auth.middleware";
import * as yup from 'yup'


export default class UsersRepository {

    private readonly usersService: UsersServices
    private readonly jwt: Jwt
    private readonly authServices: AuthServices

    constructor() {
        this.usersService = new UsersServices()
        this.jwt = new Jwt()
        this.authServices = new AuthServices()
    }

    /**
     * This method is used to
     * sign-in user
     * @param req
     * @param res
     */

    public async login(req: NextApiRequest, res: NextApiResponse) {
        try {
            const {email, password} = req.body;

            // validate body
            const emailSchema = yup.string().email().required()
            if(! await emailSchema.isValid(email)) return Error.res(res, 400, 'Invalid email field')

            const passwordSchema = yup.string().min(5).required()
            if(! await passwordSchema.isValid(password)) return Error.res(res, 400, 'The password should contain at least 5 characters')


            // check if user already exists
            const existingUser: any = await this.usersService.findUserByEmail(email)
            if (!existingUser) return Error.res(res, 403, 'Invalid login credentials.')

            // validate password
            const validPassword = await bcrypt.compare(password, existingUser.password);
            if (!validPassword) return Error.res(res, 400, 'Invalid password.')

            // sing-in user
            const jti = uuid.v4();
            const {accessToken, refreshToken} = this.jwt.generateTokens(existingUser, jti);
            await this.authServices.addRefreshTokenToWhitelist({jti, refreshToken, userId: existingUser.id})

            return res.status(200).json({status: 200, data: {accessToken, refreshToken}})

        } catch (err) {
            return Error.res(res, 500, 'Something went wrong')
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
            const {email, password, name} = req.body;

            // validate body
            const emailSchema = yup.string().email().required()
            if(! await emailSchema.isValid(email)) return Error.res(res, 400, 'Invalid email field')

            const passwordSchema = yup.string().min(5).required()
            if(! await passwordSchema.isValid(password)) return Error.res(res, 400, 'The password should contain at least 5 characters')

            const nameSchema = yup.string().min(3).max(32).required()
            if(! await nameSchema.isValid(name)) return Error.res(res, 400, 'Invalid name field')


            // check if user already exists
            const existingUser = await this.usersService.findUserByEmail(email)
            if (existingUser) return Error.res(res, 400, 'Email already in use.')

            // create user
            const user: any = await this.usersService.createUserByEmailAndPassword({email, password, name})
            const jti = uuid.v4();
            const {accessToken, refreshToken} = this.jwt.generateTokens(user, jti);
            await this.authServices.addRefreshTokenToWhitelist({jti, refreshToken, userId: user.id})

            return res.status(200).json({status: 200, data: {accessToken, refreshToken}})

        } catch (err) {
            return Error.res(res, 500, 'Something went wrong')
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
            const payload = await AuthMiddleware.isAuthenticated(req, res)
            if (!payload) return
            if (typeof payload === 'string') return

            const {userId} = payload;
            const user: any = await this.usersService.findUserById(userId);
            delete user.password;
            return res.status(200).json({status: 200, data: {user}});

        } catch (err) {
            return Error.res(res, 500, 'Something went wrong')
        }
    }
}
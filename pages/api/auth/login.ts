/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 02:26
*/

import {NextApiRequest, NextApiResponse} from "next";
import Error from "../../../server/utils/Error/Error";
import UsersServices from "../../../server/modules/users/users.services";
import * as uuid from 'uuid'
import Jwt from "../../../server/utils/jwt/jwt";
import AuthServices from "../../../server/modules/auth/auth.services";
import * as bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        try {
            const {email, password} = req.body;

            // validate body
            if (!email || !password) {
                return Error.res(res, 400, 'You must provide email and password')
            }

            // check if user already exists
            const usersService = new UsersServices()
            const existingUser: any = await usersService.findUserByEmail(email)
            if (!existingUser) {
                return Error.res(res, 403, 'Invalid login credentials.')
            }

            // validate password
            const validPassword = await bcrypt.compare(password, existingUser.password);
            if (!validPassword) {
                return Error.res(res, 400, 'Invalid password.')
            }

            // create user
            const jwt = new Jwt()
            const authServices = new AuthServices()
            const jti = uuid.v4();
            const {accessToken, refreshToken} = jwt.generateTokens(existingUser, jti);
            await authServices.addRefreshTokenToWhitelist({jti, refreshToken, userId: existingUser.id})

            res.status(200).json({status: 200, data: {accessToken, refreshToken}})

        } catch (e) {
            return Error.res(res, 500, 'Something went wrong')
        }


    } else {
        return Error.res(res, 405, 'Forbidden method')
    }
}
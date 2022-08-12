/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 01:26
*/

import {NextApiRequest, NextApiResponse} from "next";
import Error from "../../../server/utils/Error/Error";
import UsersServices from "../../../server/modules/users/users.services";
import * as uuid from 'uuid'
import Jwt from "../../../server/utils/jwt/jwt";
import AuthServices from "../../../server/modules/auth/auth.services";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        try {
            const {email, password, name} = req.body;

            // validate body
            if (!email || !password || !name) {
                return Error.res(res, 400, 'You must provide email, password and name')
            }

            // check if user already exists
            const usersService = new UsersServices()
            const existingUser = await usersService.findUserByEmail(email)
            if (existingUser) {
                return Error.res(res, 400, 'Email already in use.')
            }

            // create user
            const jwt = new Jwt()
            const authServices = new AuthServices()
            const user: any = await usersService.createUserByEmailAndPassword({email, password, name})
            const jti = uuid.v4();
            const {accessToken, refreshToken} = jwt.generateTokens(user, jti);
            await authServices.addRefreshTokenToWhitelist({jti, refreshToken, userId: user.id})

            res.status(200).json({status: 200, data: {accessToken, refreshToken}})

        } catch (e) {
            return Error.res(res, 500, 'Something went wrong')
        }


    } else {
        return Error.res(res, 405, 'Forbidden method')
    }
}
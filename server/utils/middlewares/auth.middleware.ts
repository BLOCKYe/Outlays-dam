/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 02:30
*/

import {NextApiRequest, NextApiResponse} from "next";
import {JwtPayload, verify} from "jsonwebtoken";
import Error from "../Error/Error";

export default class AuthMiddleware {


    /**
     * This middleware is used to
     * verify token and auth
     * @param req
     * @param res
     */

    public static async isAuthenticated(req: NextApiRequest, res: NextApiResponse) {
        const {authorization} = req.headers;

        if (!authorization) return Error.res(res, 401, 'Unauthorized')

        try {
            const token = authorization

            const JWTSecretKey: string | undefined = process.env.JWT_ACCESS_SECRET
            if (!JWTSecretKey) return Error.res(res, 500, 'Something went wrong')

            const payload = await verify(token, JWTSecretKey)

            if (!payload) return Error.res(res, 401, 'Token expired')

            return payload
        } catch (err: any) {
            return Error.res(res, 401, 'Unauthorized')
        }
    }
}
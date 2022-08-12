/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 02:30
*/

import {NextApiRequest} from "next";
import {JwtPayload, verify} from "jsonwebtoken";

export default class AuthMiddleware {


    /**
     * This middleware is used to
     * verify token and auth
     * @param req
     */

    public static isAuthenticated(req: NextApiRequest): JwtPayload | null | string {
        const {authorization} = req.headers;

        if (!authorization) return null

        try {
            const token = authorization

            const JWTSecretKey: string | undefined = process.env.JWT_ACCESS_SECRET
            if (!JWTSecretKey) return null

            return verify(token, JWTSecretKey)
        } catch (err: any) {
            return null
        }
    }
}
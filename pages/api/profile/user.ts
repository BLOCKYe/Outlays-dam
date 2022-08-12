/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 01:26
*/

import {NextApiRequest, NextApiResponse} from "next";
import Error from "../../../server/utils/Error/Error";
import AuthMiddleware from "../../../server/utils/middlewares/auth.middleware";
import UsersServices from "../../../server/modules/users/users.services";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        try {
            const payload: any = AuthMiddleware.isAuthenticated(req)
            if (!payload) {
                return Error.res(res, 401, 'Token expired')
            }

            const {userId} = payload;
            const usersService = new UsersServices()
            const user: any = await usersService.findUserById(userId);
            delete user.password;
            res.status(200).json({status: 200, data: {user}});
        } catch (err: any) {
            return Error.res(res, 500, 'Something went wrong')
        }


    } else {
        return Error.res(res, 405, 'Forbidden method')
    }
}
/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 01:26
*/

import {NextApiRequest, NextApiResponse} from "next";
import Error from "../../../server/utils/Error/Error";
import UsersRepository from "../../../server/modules/users/users.repository";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const usersRepository = new UsersRepository();

    switch (req.method) {

        case 'POST': {
            return usersRepository.register(req, res)
        }

        default: {
            return Error.res(res, 405, 'Forbidden method')
        }
    }
}
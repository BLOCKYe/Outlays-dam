/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 23:11
*/

import {NextApiRequest, NextApiResponse} from "next";
import Error from "../../../server/utils/Error/Error";
import OutlaysRepository from "../../../server/modules/outlays/outlays.repository";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const {id} = req.query
    if (!id) return
    if (typeof id !== "string") return

    const outlaysRepository = new OutlaysRepository()

    switch (req.method) {

        case 'GET': {
            return outlaysRepository.getOutlay(req, res, id)
        }

        case 'PUT': {
            return outlaysRepository.editOutlay(req, res, id)
        }

        case 'DELETE': {
            return outlaysRepository.deleteOutlay(req, res, id)
        }

        default: {
            return Error.res(res, 405, 'Forbidden method')
        }
    }
}
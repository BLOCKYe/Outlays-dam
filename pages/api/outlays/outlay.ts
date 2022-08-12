/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:19
*/

import {NextApiRequest, NextApiResponse} from "next";
import Error from "../../../server/utils/Error/Error";
import AuthMiddleware from "../../../server/utils/middlewares/auth.middleware";
import OutlaysServices from "../../../server/modules/outlays/outlays.services";
import {IOutlayCreateData} from "../../../server/modules/outlays/IOutlays";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method === 'POST') {
        try {
            const payload: any = AuthMiddleware.isAuthenticated(req)
            if (!payload) {
                return Error.res(res, 401, 'Token expired')
            }

            const {userId} = payload;
            const {title, description, date, value} = req.body;
            // validate body
            if (!title || !description || !date || !value) {
                return Error.res(res, 400, 'You must provide title, description, date and value')
            }

            const outlaysServices = new OutlaysServices()
            const reqData: IOutlayCreateData = {
                userId: userId,
                title: title,
                value: value,
                date: date,
                description: description
            }

            await outlaysServices.createOutlay(reqData)
            res.status(200).json({status: 200, message: 'Created new outlay'});
        } catch (err: any) {
            return Error.res(res, 500, 'Something went wrong')
        }

    } else if (req.method === 'GET') {
        try {
            const payload: any = AuthMiddleware.isAuthenticated(req)
            if (!payload) {
                return Error.res(res, 401, 'Token expired')
            }

            const {userId} = payload;
            const outlaysServices = new OutlaysServices()
            const outlays: any[] = await outlaysServices.getUserOutlays(userId)
            res.status(200).json({status: 200, data: outlays});
        } catch (err: any) {
            return Error.res(res, 500, 'Something went wrong')
        }
    } else {
        return Error.res(res, 405, 'Forbidden method')
    }
}
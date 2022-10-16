/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 19:36
*/

import {NextApiRequest, NextApiResponse} from "next";
import AuthMiddleware from "../../utils/middlewares/auth.middleware";
import Error from "../../utils/Error/Error";
import AnalyticsServices from "./analytics.services";

export default class AnalyticsRepository {

    private readonly analyticsServices: AnalyticsServices

    constructor() {
        this.analyticsServices = new AnalyticsServices()
    }

    /**
     * This method is used to
     * get user's categories
     * @param req
     * @param res
     */

    public async spentAmount(req: NextApiRequest, res: NextApiResponse) {
        try {
            const payload = await AuthMiddleware.isAuthenticated(req, res)
            if (!payload) return
            if (typeof payload === 'string') return

            const spentAmount: any = await this.analyticsServices.getSpentAmount(payload.userId)
            return res.status(200).json({status: 200, data: spentAmount});
        } catch (err) {
            return Error.res(res, 500, 'Something went wrong')
        }
    }
}
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
import CategoriesRepository from "../../../server/modules/categories/categories.repository";
import OutlaysRepository from "../../../server/modules/outlays/outlays.repository";
import AnalyticsRepository from "../../../server/modules/analytics/analytics.repository";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const analyticsRepository = new AnalyticsRepository()

    switch (req.method) {

        case 'GET': {
            return analyticsRepository.spentAmount(req, res)
        }

        default: {
            return Error.res(res, 405, 'Forbidden method')
        }
    }
}
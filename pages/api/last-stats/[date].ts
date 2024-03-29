/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:19
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import AnalyticsService from "../../../server/modules/analytics/analytics.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const analyticsService = new AnalyticsService();

  const { date } = req.query;

  switch (req.method) {
    case "GET": {
      return analyticsService.currentMonthSpentAmount(req, res, date);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

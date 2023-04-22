/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 09/04/2023
 * Time: 12:31
 */
import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import GoalsService from "../../../server/modules/goals/goals.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const goalsService = new GoalsService();

  switch (req.method) {
    case "GET": {
      return goalsService.getGoals(req, res);
    }

    case "POST": {
      return goalsService.createGoal(req, res);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

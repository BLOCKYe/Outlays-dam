/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 09/04/2023
 * Time: 12:32
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import GoalsService from "../../../server/modules/goals/goals.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  if (!id) return;
  if (typeof id !== "string") return;

  const goalsService = new GoalsService();

  switch (req.method) {
    case "GET": {
      return goalsService.getGoal(req, res, id);
    }

    case "PUT": {
      return goalsService.editGoal(req, res, id);
    }

    case "PATCH": {
      return goalsService.setAsReached(req, res, id);
    }

    case "DELETE": {
      return goalsService.deleteGoal(req, res, id);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

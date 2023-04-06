/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:19
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import OperationsService from "../../../server/modules/operations/operations.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const operationsService = new OperationsService();

  switch (req.method) {
    case "GET": {
      return operationsService.getOperations(req, res);
    }

    case "POST": {
      return operationsService.createOperation(req, res);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

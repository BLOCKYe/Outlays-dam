/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 23:11
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import OperationsService from "../../../server/modules/operations/operations.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  if (!id) return;
  if (typeof id !== "string") return;

  const operationsService = new OperationsService();

  switch (req.method) {
    case "GET": {
      return operationsService.getOperation(req, res, id);
    }

    case "PUT": {
      return operationsService.editOperation(req, res, id);
    }

    case "DELETE": {
      return operationsService.deleteOperation(req, res, id);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

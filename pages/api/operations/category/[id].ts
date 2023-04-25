/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 23:11
 */

import type {NextApiRequest, NextApiResponse} from "next";
import OperationsService from "../../../../server/modules/operations/operations.service";
import Error from "../../../../server/utils/Error/Error";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
  const {id} = req.query;
  if (!id) return;
  if (typeof id !== "string") return;

  const operationsService: OperationsService = new OperationsService();

  switch (req.method) {
    case "GET": {
      return operationsService.getCategoryOperations(req, res, id);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

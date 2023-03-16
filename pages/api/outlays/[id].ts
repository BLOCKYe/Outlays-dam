/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 23:11
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import OutlaysService from "../../../server/modules/outlays/outlays.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  if (!id) return;
  if (typeof id !== "string") return;

  const outlaysService = new OutlaysService();

  switch (req.method) {
    case "GET": {
      return outlaysService.getOutlay(req, res, id);
    }

    case "PUT": {
      return outlaysService.editOutlay(req, res, id);
    }

    case "DELETE": {
      return outlaysService.deleteOutlay(req, res, id);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

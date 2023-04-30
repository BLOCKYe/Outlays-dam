/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 30.04.2023
 * Time: 22:25
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import ConfigService from "../../../server/modules/users/config.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const configService = new ConfigService();

  switch (req.method) {
    case "PUT": {
      return await configService.updateConfig(req, res);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

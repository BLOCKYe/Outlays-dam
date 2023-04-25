/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 01:26
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import UsersService from "../../../server/modules/users/users.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const usersService = new UsersService();

  switch (req.method) {
    case "GET": {
      return await usersService.profile(req, res);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

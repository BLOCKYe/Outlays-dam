/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 23:40
 */

import type { NextApiRequest, NextApiResponse } from "next";
import UsersService from "../../../../server/modules/users/users.service";
import Error from "../../../../server/utils/Error/Error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  if (!id) return;
  if (typeof id !== "string") return;

  const usersService = new UsersService();

  switch (req.method) {
    case "GET": {
      return usersService.verify(req, res, id);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 02:26
 */

import { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import UsersRepository from "../../../server/modules/users/users.repository";
import * as uuid from "uuid";
import Jwt from "../../../server/utils/jwt/jwt";
import AuthRepository from "../../../server/modules/auth/auth.repository";
import * as bcrypt from "bcrypt";
import UsersService from "../../../server/modules/users/users.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const usersRepository = new UsersService();

  switch (req.method) {
    case "POST": {
      return usersRepository.login(req, res);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

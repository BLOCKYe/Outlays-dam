/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 01:42
 */

import type { NextApiResponse } from "next";
import type { IError } from "./IError";

export default class Error {
  /**
   * This method is used to
   * return error response
   * @param res
   * @param status
   * @param message
   */
  public static res(res: NextApiResponse, status: number, message: string) {
    const resData: IError = {
      status: status,
      message: message,
    };
    return res.status(status).json(resData);
  }
}

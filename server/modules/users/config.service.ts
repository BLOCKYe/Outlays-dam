/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 20:02
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../utils/Error/Error";
import AuthMiddleware from "../../utils/middlewares/auth.middleware";
import * as yup from "yup";
import ConfigRepository from "./config.repository";
import { SectionsEnum } from "../../../common/dashboard/SectionsEnum";

export default class ConfigService {
  private readonly configRepository: ConfigRepository;

  constructor() {
    this.configRepository = new ConfigRepository();
  }

  /**
   * This method is used to
   * update user config
   * @param req
   * @param res
   */
  public async updateConfig(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;

      const { defaultSection } = req.body;

      const defaultSectionSchema = yup
        .string()
        .oneOf(Object.keys(SectionsEnum));
      if (!(await defaultSectionSchema.isValid(defaultSection)))
        return Error.res(res, 400, "Invalid defaultSection field");

      const { userId } = payload;
      const config: any = await this.configRepository.update(
        userId,
        defaultSection
      );

      return res.status(200).json({ status: 200, data: { config } });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }
}

/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 19:36
 */

import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../utils/middlewares/auth.middleware";
import Error from "../../utils/Error/Error";
import AnalyticsRepository from "./analytics.repository";
import AnalyticsCommands from "./analytics.commands";
import moment from "moment";
import * as yup from "yup";

export default class AnalyticsService {
  private readonly analyticsRepository: AnalyticsRepository;

  constructor() {
    this.analyticsRepository = new AnalyticsRepository();
  }

  /**
   * This method is used to
   * get user's categories
   * @param req
   * @param res
   * @param date
   */
  public async currentMonthSpentAmount(
    req: NextApiRequest,
    res: NextApiResponse,
    date: string | string[] | undefined
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const dateAsDate = moment(date).toDate();

      const dateSchema = yup.date().required();
      if (!(await dateSchema.isValid(dateAsDate)))
        return Error.res(res, 400, "Wrong date");

      const current = AnalyticsCommands.getMonthRange(dateAsDate);
      const last = AnalyticsCommands.getMonthRange(
        moment(dateAsDate).subtract(1, "month").toDate()
      );

      const spentAmount: any =
        await this.analyticsRepository.getSpentAmountFromCurrentMonth(
          payload.userId,
          current.start,
          last.start,
          current.end,
          last.end
        );
      return res.status(200).json({ status: 200, data: spentAmount });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get user's categories
   * @param req
   * @param res
   * @param date
   */
  public async monthAnalytics(
    req: NextApiRequest,
    res: NextApiResponse,
    date: string | string[] | undefined
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const dateAsDate = moment(date).toDate();

      const dateSchema = yup.date().required();
      if (!(await dateSchema.isValid(dateAsDate)))
        return Error.res(res, 400, "Wrong date");

      const ranges = AnalyticsCommands.getLastTwelveMonthsRanged(dateAsDate);

      const lastMonths =
        await this.analyticsRepository.getLastTwelveMonthsStats(
          payload.userId,
          ranges
        );

      const current = AnalyticsCommands.getMonthRange(dateAsDate);

      const categories =
        await this.analyticsRepository.getLastMonthsCategoriesStats(
          payload.userId,
          current.start,
          current.end
        );

      const response = {
        lastMonths: lastMonths,
        categories: categories,
      };

      return res.status(200).json({ status: 200, data: response });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }
}

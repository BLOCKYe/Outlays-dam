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
import AnalyticsHelper from "./analytics.helper";
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

      const dateAsDate = moment(date).toDate();

      const dateSchema = yup.date().required();
      if (!(await dateSchema.isValid(dateAsDate)))
        return Error.res(res, 400, "Wrong date");

      const current = AnalyticsHelper.getMonthRange(dateAsDate);
      const last = AnalyticsHelper.getMonthRange(
        moment(dateAsDate).subtract(1, "month").toDate()
      );

      const selectedMonth: any =
        await this.analyticsRepository.getOperationsResultsFromRange(
          payload.userId,
          current.start,
          current.end
        );

      const previousMonth: any =
        await this.analyticsRepository.getOperationsResultsFromRange(
          payload.userId,
          last.start,
          last.end
        );
      return res.status(200).json({
        status: 200,
        data: { selected: selectedMonth, previous: previousMonth },
      });
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

      const dateAsDate = moment(date).toDate();

      const dateSchema = yup.date().required();
      if (!(await dateSchema.isValid(dateAsDate)))
        return Error.res(res, 400, "Wrong date");

      const ranges = AnalyticsHelper.getLastTwelveMonthsRanges(dateAsDate);

      const monthExpenses = [];
      const monthIncomes = [];
      for (let i = 0; i < 12; i++) {
        const monthResults: any =
          await this.analyticsRepository.getOperationsResultsFromRange(
            payload.userId,
            ranges[i]!.start,
            ranges[i]!.end
          );

        const localExpenseData = {
          value: monthResults?.expenses._sum?.value ?? 0,
          label: moment(ranges[i]?.date).format("MMMM"),
        };

        const localIncomeData = {
          value: monthResults?.incomes._sum?.value ?? 0,
          label: moment(ranges[i]?.date).format("MMMM"),
        };

        monthExpenses.push(localExpenseData);
        monthIncomes.push(localIncomeData);
      }

      const current = AnalyticsHelper.getMonthRange(dateAsDate);

      const categories =
        await this.analyticsRepository.getLastMonthsCategoriesStats(
          payload.userId,
          current.start,
          current.end
        );

      const operationsCount =
        await this.analyticsRepository.getOperationsCountFromRange(
          payload.userId,
          current.start,
          current.end
        );

      const reachedGoalsCount =
        await this.analyticsRepository.getReachedGoalsCountFromRange(
          payload.userId,
          current.start,
          current.end
        );

      const response = {
        expenses: monthExpenses,
        incomes: monthIncomes,
        categories: categories,
        operationsCount: operationsCount,
        reachedGoalsCount: reachedGoalsCount,
      };

      return res.status(200).json({ status: 200, data: response });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }
}

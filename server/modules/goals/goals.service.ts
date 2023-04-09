/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 22:37
 */

import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../utils/middlewares/auth.middleware";
import Error from "../../utils/Error/Error";
import UsersRepository from "../users/users.repository";
import * as yup from "yup";
import GoalsRepository from "./goals.repository";
import type { IGoalCreateData, IGoalEditData } from "./IGoals";
import AnalyticsRepository from "../analytics/analytics.repository";

export default class GoalsService {
  private readonly usersRepository: UsersRepository;
  private readonly goalsRepository: GoalsRepository;
  private readonly analyticsRepository: AnalyticsRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.goalsRepository = new GoalsRepository();
    this.analyticsRepository = new AnalyticsRepository();
  }

  /**
   * This method is used to
   * create new goal
   * @param req
   * @param res
   */
  public async createGoal(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const {
        title,
        description,
        startDate,
        endDate,
        type,
        reached,
        goalValue,
      } = req.body;
      // validate body
      const operationSchema = yup.object().shape({
        title: yup.string().min(1).max(50).required(),
        description: yup.string().max(255),
        type: yup.string().max(255).required(),
        startDate: yup.string().max(255).required(),
        endDate: yup.string().max(255).required(),
        goalValue: yup.number().positive().required(),
        reached: yup.boolean().isFalse().required(),
      });

      if (
        !(await operationSchema.isValid({
          title,
          description,
          startDate,
          endDate,
          goalValue,
          type,
          reached,
        }))
      ) {
        return Error.res(res, 400, "Invalid req body");
      }

      const reqData: IGoalCreateData = {
        userId: payload.userId,
        title: title,
        goalValue: goalValue,
        type: type,
        startDate: startDate,
        endDate: endDate,
        description: description,
        reached: reached,
      };

      const goalsData = await this.goalsRepository.createGoal(reqData);
      return res.status(200).json({ status: 200, data: goalsData });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get user's goals
   * @param req
   * @param res
   */

  public async getGoals(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const goals = await this.goalsRepository.getUserGoals(payload.userId);
      const copyOfGoals = [];
      // get results from every goal
      for (const goal of goals) {
        const goalResult: any =
          await this.analyticsRepository.getOperationsResultsFromRange(
            payload.userId,
            goal.startDate,
            goal.endDate
          );

        const goalWithResults = {
          ...goal,
          result: goalResult,
        };

        copyOfGoals.push(goalWithResults);
      }

      return res.status(200).json({ status: 200, data: copyOfGoals });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get goal by id
   * @param req
   * @param res
   * @param id
   */
  public async getGoal(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const Goal = await this.goalsRepository.findById(payload.userId, id);
      if (!Goal) return Error.res(res, 404, "Goal not found");

      return res.status(200).json({ status: 200, data: Goal });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * delete outlay by id
   * @param req
   * @param res
   * @param id
   */
  public async deleteGoal(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const Goal = await this.goalsRepository.deleteById(payload.userId, id);
      if (!Goal) return Error.res(res, 404, "Goal not found");

      return res.status(200).json({ status: 200, data: Goal });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * delete outlay by id
   * @param req
   * @param res
   * @param id
   */
  public async setAsReached(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const Goal = await this.goalsRepository.setAsReached(payload.userId, id);
      if (!Goal) return Error.res(res, 404, "Goal not found");

      return res.status(200).json({ status: 200, data: Goal });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * edit outlay by id
   * @param req
   * @param res
   * @param id
   */
  public async editGoal(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const {
        title,
        description,
        startDate,
        endDate,
        type,
        reached,
        goalValue,
      } = req.body;

      const reqData: IGoalEditData = {
        title: title,
        goalValue: goalValue,
        type: type,
        startDate: startDate,
        endDate: endDate,
        description: description,
        reached: reached,
      };

      const goal: any = await this.goalsRepository.editGoal(
        payload.userId,
        id,
        reqData
      );
      if (!goal) return Error.res(res, 404, "Goal not found");

      return res.status(200).json({ status: 200, data: goal });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }
}

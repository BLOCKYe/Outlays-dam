/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 05.05.2023
 * Time: 02:55
 */

import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../utils/middlewares/auth.middleware";
import Error from "../../utils/Error/Error";
import UsersRepository from "../users/users.repository";
import GoalsRepository from "./goals.repository";
import type { IGoal, IGoalCreateData, IGoalEditData } from "./IGoals";
import AnalyticsRepository from "../analytics/analytics.repository";
import GoalsHelper from "./goals.helper";
import StringValidator from "../../utils/validator/StringValidator";
import TypeValidator from "../../utils/validator/TypeValidator";
import NumberValidator from "../../utils/validator/NumberValidator";
import { GoalsTypesEnum } from "../../../common/goals/GoalsTypesEnum";
import { IResult } from "../../../client/modules/goals/redux/GoalsInterfaces";

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

      const { title, description, startDate, endDate, type, goalValue } =
        req.body;
      await new StringValidator(res, true, 1, 50).validate(title);
      await new StringValidator(res, false, 0, 255).validate(description);
      await new TypeValidator(res, Object.keys(GoalsTypesEnum), true).validate(
        type
      );
      await new StringValidator(res, true, 1, 255).validate(startDate);
      await new StringValidator(res, true, 1, 255).validate(endDate);
      await new NumberValidator(res, true, true).validate(goalValue);

      const reqData: IGoalCreateData = {
        userId: payload.userId,
        title: title,
        goalValue: goalValue,
        type: type,
        startDate: startDate,
        endDate: endDate,
        description: description,
        reached: false,
      };

      const goalsData: IGoal = await this.goalsRepository.createGoal(reqData);
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

      const goals: IGoal[] = await this.goalsRepository.getUserGoals(
        payload.userId
      );
      const copyOfGoals = [];

      // get results from every goal
      for (const goal of goals) {
        if (!goal) return;
        const goalResult: any =
          await this.analyticsRepository.getOperationsResultsFromRange(
            payload.userId,
            goal.startDate,
            goal.endDate
          );

        const goalWithResults = {
          ...goal,
          result: GoalsHelper.getValueFromGoalType(goalResult, goal.type),
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

      const Goal: IGoal = await this.goalsRepository.findById(
        payload.userId,
        id
      );
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

      const Goal: IGoal = await this.goalsRepository.deleteById(
        payload.userId,
        id
      );
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

      const Goal: IGoal = await this.goalsRepository.setAsReached(
        payload.userId,
        id
      );
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

      const { title, description, startDate, endDate, type, goalValue } =
        req.body;

      await new StringValidator(res, false, 1, 50).validate(title);
      await new StringValidator(res, false, 0, 255).validate(description);
      await new TypeValidator(res, Object.keys(GoalsTypesEnum), false).validate(
        type
      );
      await new StringValidator(res, false, 1, 255).validate(startDate);
      await new StringValidator(res, false, 1, 255).validate(endDate);
      await new NumberValidator(res, false, true).validate(goalValue);

      const reqData: IGoalEditData = {
        title: title,
        goalValue: goalValue,
        type: type,
        startDate: startDate,
        endDate: endDate,
        description: description,
      };

      const goal: IGoal = await this.goalsRepository.editGoal(
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

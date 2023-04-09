/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:11
 */

import { prisma } from "../../utils/prisma/prisma";
import type { IGoalCreateData, IGoalEditData } from "./IGoals";

export default class GoalsRepository {
  /**
   * This method is used to
   * create new goal
   * @param data
   */
  public createGoal(data: IGoalCreateData) {
    return prisma.goal.create({
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        goalValue: data.goalValue,
        userId: data.userId,
        type: data.type,
        reached: data.reached,
      },
    });
  }

  /**
   * This method is used to
   * get all user goals
   * @param userId
   */

  public getUserGoals(userId: string) {
    return prisma.goal.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        userId: userId,
      },
    });
  }

  /**
   * This method is used to
   * delete one goal by id
   * @param userId
   * @param goalId
   */
  public deleteById(userId: string, goalId: string) {
    return prisma.goal.delete({
      where: {
        id: goalId,
      },
    });
  }

  /**
   * This method is used to
   * get one goal by id
   * @param userId
   * @param operationId
   */
  public findById(userId: string, goalId: string) {
    return prisma.goal.findFirst({
      where: {
        userId: userId,
        id: goalId,
      },
    });
  }

  /**
   * This method is used to
   * edit goal by id
   * @param userId
   * @param goalId
   * @param data
   */
  public editGoal(userId: string, goalId: string, data: IGoalEditData) {
    return prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type,
        goalValue: data.goalValue,
        reached: data.reached,
      },
    });
  }

  /**
   * This method is used to
   * set goal as reached
   * @param userId
   * @param goalId
   */
  public setAsReached(userId: string, goalId: string) {
    return prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        reached: true,
      },
    });
  }
}

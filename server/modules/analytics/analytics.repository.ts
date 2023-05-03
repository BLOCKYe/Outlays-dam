/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:11
 */

import { prisma } from "../../utils/prisma/prisma";
import { OperationsTypesEnum } from "../../../common/operations/OperationsTypesEnum";

export default class AnalyticsRepository {
  /**
   * This method is used to
   * get sum of operations by range
   * @param userId
   * @param startDate
   * @param endDate
   */
  public async getOperationsResultsFromRange(
    userId: string,
    startDate: string,
    endDate: string
  ) {
    const [expenses, incomes] = await Promise.all([
      prisma.operation.aggregate({
        where: {
          userId: userId,
          type: OperationsTypesEnum.EXPENSE,
          date: {
            lte: endDate,
            gte: startDate,
          },
        },
        _sum: {
          value: true,
        },
      }),
      prisma.operation.aggregate({
        where: {
          userId: userId,
          type: OperationsTypesEnum.INCOME,
          date: {
            lte: endDate,
            gte: startDate,
          },
        },
        _sum: {
          value: true,
        },
      }),
    ]);

    return { incomes, expenses };
  }

  /**
   * This method is used to get number
   * of operations from range
   * @param userId
   * @param startDate
   * @param endDate
   */
  public async getOperationsCountFromRange(
    userId: string,
    startDate: string,
    endDate: string
  ) {
    const count = await prisma.operation.count({
      where: {
        userId: userId,
        date: {
          lte: endDate,
          gte: startDate,
        },
      },
    });

    return count;
  }

  /**
   *
   * @param userId
   * @param startDate
   * @param endDate
   */
  public async getLastMonthsCategoriesStats(
    userId: string,
    startDate: string,
    endDate: string
  ) {
    const categoriesStats = await prisma.category.findMany({
      where: {
        userId: userId,
      },
      include: {
        operations: {
          where: {
            date: {
              lte: endDate,
              gte: startDate,
            },
          },
        },
      },
    });

    const parsedCategories = [];

    for (const category of categoriesStats) {
      let sumOfOperationsValues: any = 0;
      for (const outlay of category.operations) {
        sumOfOperationsValues = sumOfOperationsValues + Number(outlay.value);
      }

      const data = {
        label: category.name,
        color: category.color,
        id: category.id,
        value: sumOfOperationsValues,
      };

      parsedCategories.push(data);
    }

    return parsedCategories;
  }

  /**
   * This method is used to get number
   * of operations from range
   * @param userId
   * @param startDate
   * @param endDate
   */
  public async getReachedGoalsCountFromRange(
    userId: string,
    startDate: string,
    endDate: string
  ) {
    return prisma.goal.count({
      where: {
        userId: userId,
        reachedDate: {
          lte: endDate,
          gte: startDate,
        },
      },
    });
  }
}

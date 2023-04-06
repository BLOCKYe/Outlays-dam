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
    const outcomes = await prisma.operation.aggregate({
      where: {
        userId: userId,
        type: OperationsTypesEnum.OUTCOME,
        date: {
          lte: endDate,
          gte: startDate,
        },
      },
      _sum: {
        value: true,
      },
    });

    const incomes = await prisma.operation.aggregate({
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
    });

    return { incomes, outcomes };
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
      let sumOfOperationsValues = 0;
      for (const outlay of category.operations) {
        sumOfOperationsValues += outlay.value;
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
}

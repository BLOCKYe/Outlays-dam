/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:11
 */

import { prisma } from "../../utils/prisma/prisma";
import { OutlaysTypesEnum } from "../../../common/outlays/OutlaysTypesEnum";

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
    const outcomes = await prisma.outlay.aggregate({
      where: {
        userId: userId,
        type: OutlaysTypesEnum.OUTCOME,
        date: {
          lte: endDate,
          gte: startDate,
        },
      },
      _sum: {
        value: true,
      },
    });

    const incomes = await prisma.outlay.aggregate({
      where: {
        userId: userId,
        type: OutlaysTypesEnum.INCOME,
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
        outays: {
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
      let sumOfOutlaysValues = 0;
      for (const outlay of category.outays) {
        sumOfOutlaysValues += outlay.value;
      }

      const data = {
        label: category.name,
        color: category.color,
        id: category.id,
        value: sumOfOutlaysValues,
      };

      parsedCategories.push(data);
    }

    return parsedCategories;
  }
}

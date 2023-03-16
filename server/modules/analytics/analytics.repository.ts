/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:11
 */

import { prisma } from "../../utils/prisma/prisma";
import moment from "moment";
import type { IRangeDate } from "./IAnalytics";
import categories from "../../../pages/categories";

export default class AnalyticsRepository {
  /**
   * This method is used to
   * get user spent amount
   * @param userId
   * @param startDate
   * @param startDateLast
   * @param endDate
   * @param endDateLast
   */
  public async getSpentAmountFromCurrentMonth(
    userId: string,
    startDate: string,
    startDateLast: string,
    endDate: string,
    endDateLast: string
  ) {
    const current = await prisma.outlay.aggregate({
      where: {
        userId: userId,
        date: {
          lte: endDate,
          gte: startDate,
        },
      },
      _sum: {
        value: true,
      },
    });

    const currentCount = await prisma.outlay.count({
      where: {
        userId: userId,
        date: {
          lte: endDate,
          gte: startDate,
        },
      },
    });

    const last = await prisma.outlay.aggregate({
      where: {
        userId: userId,
        date: {
          lte: endDateLast,
          gte: startDateLast,
        },
      },
      _sum: {
        value: true,
      },
    });

    const lastCount = await prisma.outlay.count({
      where: {
        userId: userId,
        date: {
          lte: endDateLast,
          gte: startDateLast,
        },
      },
    });

    return { current, last, currentCount, lastCount };
  }

  /**
   *
   * @param userId
   * @param ranges
   */
  public async getLastTwelveMonthsStats(userId: string, ranges: IRangeDate[]) {
    const monthsStats = [];

    for (let i = 0; i < 12; i++) {
      const localMonthData = await prisma.outlay.aggregate({
        where: {
          userId: userId,
          date: {
            lte: ranges[i]!.end,
            gte: ranges[i]!.start,
          },
        },
        _sum: {
          value: true,
        },
      });

      const localData = {
        value: localMonthData?._sum?.value ?? 0,
        label: moment(ranges[i]?.date).format("MMMM"),
      };

      monthsStats.push(localData);
    }

    return monthsStats;
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
        id: category.id,
        value: sumOfOutlaysValues,
      };

      parsedCategories.push(data);
    }

    return parsedCategories;
  }
}

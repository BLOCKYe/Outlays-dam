import moment from "moment/moment";
import type { IRangeDate } from "./IAnalytics";

export default class AnalyticsHelper {
  /**
   * Create start - end date range from date
   * @param date
   */
  public static getMonthRange(date: Date): { start: string; end: string } {
    const startDate = moment(date).startOf("month").format("YYYY-MM-DD");
    const endDate = moment(date).endOf("month").format("YYYY-MM-DD");

    return { start: startDate, end: endDate };
  }

  /**
   * Get array of 12 ranges
   * @param date
   */
  public static getLastTwelveMonthsRanges(date: Date): IRangeDate[] {
    const ranges: IRangeDate[] = [];

    for (let i = 0; i < 12; i++) {
      const startDate = moment(date)
        .subtract(i, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = moment(date)
        .subtract(i, "month")
        .endOf("month")
        .format("YYYY-MM-DD");

      const localRange = {
        start: startDate,
        end: endDate,
        date: moment(date).subtract(i, "month").toDate(),
      };

      ranges.push(localRange);
    }

    return ranges;
  }
}

/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 10.04.2023
 * Time: 21:56
 */

import type { IResult } from "../../../client/modules/goals/redux/GoalsInterfaces";

export default class GoalsHelper {
  public static getValueFromGoalType(result: IResult, type: string): number {
    switch (type) {
      case "EXPENSE": {
        return result.expenses?._sum?.value ?? 0;
      }

      case "INCOME": {
        return result.incomes?._sum?.value ?? 0;
      }

      case "SAVE": {
        return (
          (result.incomes?._sum?.value ?? 0) -
          (result.expenses?._sum?.value ?? 0)
        );
      }

      default: {
        return 0;
      }
    }
  }
}

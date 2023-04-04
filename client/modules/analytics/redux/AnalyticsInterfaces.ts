import type { IColors } from "../../categories/utils/CategoryColors";

export interface ILastSpendingResponse {
  status?: number;
  data?: ILastSpendingData;
}

export interface ILastSpendingData {
  previous: ILastSpendingMonth;
  selected: ILastSpendingMonth;
}

export interface ILastSpendingMonth {
  incomes: { _sum?: Sum };
  outcomes: { _sum?: Sum };
}

export interface IBasicAnalyticsMonthData {
  value: number;
  label: string;
}

export interface IBasicAnalyticsCategoryData {
  label: string;
  color: IColors;
  id: string;
  value: number;
}

export interface Sum {
  value?: number;
}

export interface ILastSpendingResponse {
  status?: number;
  data?: ILastSpendingData;
}

export interface ILastSpendingData {
  current?: { _sum?: Sum };
  last?: { _sum?: Sum };
  currentCount?: number;
  lastCount?: number;
}

export interface IBasicAnalyticsMonthData {
  value: number;
  label: string;
}

export interface IBasicAnalyticsCategoryData {
  label: string;
  id: string;
  value: number;
}

export interface Sum {
  value?: number;
}

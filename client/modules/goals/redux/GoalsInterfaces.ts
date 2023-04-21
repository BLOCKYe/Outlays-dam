import type { IGoalType } from "../../../../common/goals/GoalsTypesEnum";

export interface IGoalsResponse {
  status?: number;
  data?: IGoalData[];
}

export interface IGoalResponse {
  status?: number;
  data?: IGoalData;
}

export interface IGoalData {
  id: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  reached?: boolean;
  goalValue?: number;
  type?: string;
  userId?: string;
  result?: number;
}

export interface IResult {
  incomes?: { _sum?: { value?: number } };
  expenses?: { _sum?: { value?: number } };
}

export interface IGoalRequest {
  title: string;
  description?: string;
  goalValue: number;
  type: IGoalType;
  startDate: string;
  endDate: string;
}

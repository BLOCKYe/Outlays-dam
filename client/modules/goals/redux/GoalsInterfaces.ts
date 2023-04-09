export interface IGoalsResponse {
  status?: number;
  data?: IGoalData[];
}

export interface IGoalData {
  id?: string;
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
  result?: IResult;
}

interface IResult {
  incomes?: { _sum?: { value?: number } };
  expenses?: { _sum?: { value?: number } };
}

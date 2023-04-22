export interface IGoalCreateData {
  title: string;
  description: string;
  type: string;
  userId: string;
  goalValue: number;
  startDate: string;
  endDate: string;
  reached: boolean;
}

export interface IGoalEditData {
  title?: string;
  description?: string;
  date?: string;
  type?: string;
  goalValue?: number;
  startDate?: string;
  endDate?: string;
  reached?: boolean;
}

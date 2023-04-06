export interface IOperationCreateData {
  title: string;
  description: string;
  date: string;
  type: string;
  userId: string;
  value: number;
  categories: any[];
}

export interface IOperationEditData {
  title?: string;
  description?: string;
  date?: string;
  type?: string;
  value?: number;
  categories: any[];
}

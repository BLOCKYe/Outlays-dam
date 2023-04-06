import type { ICategoryData } from "../../categories/redux/CategoriesInterfaces";
import type { IOperationType } from "../../../../common/operations/OperationsTypesEnum";

export interface IOperationsResponse {
  status?: number;
  data: IOperationData[];
}

export interface IOperationData {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  type?: IOperationType;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
  value?: number;
  categories: ICategoryData[];
}

export interface IOperationRequest {
  title: string;
  description?: string;
  value: number;
  type: string;
  date: string;
  categories?: any[];
}

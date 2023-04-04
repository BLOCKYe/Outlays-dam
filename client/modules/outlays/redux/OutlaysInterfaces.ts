import type { ICategoryData } from "../../categories/redux/CategoriesInterfaces";
import type { IOutlayType } from "../../../../common/outlays/OutlaysTypesEnum";

export interface IOutlaysResponse {
  status?: number;
  data: IOutlayData[];
}

export interface IOutlayData {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  type?: IOutlayType;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
  value?: number;
  categories: ICategoryData[];
}

export interface IOutlayRequest {
  title: string;
  description?: string;
  value: number;
  type: string;
  date: string;
  categories?: any[];
}

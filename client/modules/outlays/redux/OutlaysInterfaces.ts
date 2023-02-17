import { ICategoryData } from "../../categories/redux/CategoriesInterfaces";

export interface IOutlaysResponse {
  status?: number;
  data: IOutlayData[];
}

export interface IOutlayData {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
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
  date: string;
  categories?: any[];
}

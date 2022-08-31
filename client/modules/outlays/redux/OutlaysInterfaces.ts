import {ICategoryData} from "../../categories/redux/CategoriesInterfaces";

export interface IOutlaysResponse {
    status?: number;
    data:   IOutlayData[];
}

export interface IOutlayData {
    id?:          string;
    title?:       string;
    description?: string;
    date?:        Date;
    createdAt?:   Date;
    updatedAt?:   Date;
    userId?:      string;
    value?:       number;
    categories?:  ICategoryData[];
}

import {IColors} from "../utils/CategoryColors";

export interface ICategoriesResponse {
    status?: number;
    data:   ICategoryData[];
}

export interface ICategoryData {
    id: string,
    name: string,
    color: IColors,
    userId: string
}

export interface ICategoryRequest {
    name:        string;
    color: string;
}
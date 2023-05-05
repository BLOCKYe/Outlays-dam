import type { Category } from ".prisma/client";

export interface ICategoryCreateData {
  name: string;
  color: string;
  userId: string;
}

export interface ICategoryEditData {
  name?: string;
  color?: string;
}

export type ICategory = Category | null;

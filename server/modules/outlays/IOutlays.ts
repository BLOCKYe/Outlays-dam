export interface IOutlayCreateData {
  title: string;
  description: string;
  date: string;
  type: string;
  userId: string;
  value: number;
  categories: any[];
}

export interface IOutlayEditData {
  title?: string;
  description?: string;
  date?: string;
  type?: string;
  value?: number;
  categories: any[];
}

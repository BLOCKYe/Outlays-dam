export interface IOutlayCreateData {
    title: string,
    description: string,
    date: string,
    userId: string,
    value: number,
    categories: any[]
}

export interface IOutlayEditData {
    title?: string,
    description?: string,
    date?: string,
    value?: number,
    categories: any[]
}
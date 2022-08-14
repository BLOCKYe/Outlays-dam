export interface IOutlayCreateData {
    title: string,
    description: string,
    date: Date,
    userId: string,
    value: number,
    categories: any[]
}

export interface IOutlayEditData {
    title?: string,
    description?: string,
    date?: Date,
    value?: number,
    categories?: any[]
}
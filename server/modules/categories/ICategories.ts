export interface ICategoryCreateData {
    name: string,
    color: string,
    userId: string
}

export interface ICategoryEditData {
    name?: string,
    color?: string
}
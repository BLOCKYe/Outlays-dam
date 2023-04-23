// AUTO GENERATED FILE BY @kalissaac/prisma-typegen
// DO NOT EDIT




export interface User {
    id: string,
    email: string,
    name: string,
    password: string,
    refreshTokens: RefreshToken[],
    createdAt: Date,
    updatedAt: Date,
    operations: Operation[],
    categories: Category[],
    goals: Goal[],
    isVerified: boolean,
}

export interface RefreshToken {
    id: string,
    hashedToken: string,
    userId: string,
    User: User,
    revoked: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export interface Operation {
    id: string,
    title: string,
    description: string,
    type: string,
    date: string,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
    user: User,
    value: number,
    categories: Category[],
}

export interface Category {
    id: string,
    name: string,
    color: string,
    userId: string,
    user: User,
    operations: Operation[],
}

export interface Goal {
    id: string,
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    createdAt: Date,
    updatedAt: Date,
    reached: boolean,
    goalValue: number,
    type: string,
    userId: string,
    user: User,
}

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
    outlays: Outlay[],
    categories: Category[],
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

export interface Outlay {
    id: string,
    title: string,
    description: string,
    date: Date,
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
    outays: Outlay[],
}

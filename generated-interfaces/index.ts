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

export interface ILoginRequest {
    email: string,
    password: string
}

export interface ILoginResponse {
    status?: number;
    data?:   ILoginData;
}

export interface ILoginData {
    accessToken?:  string;
    refreshToken?: string;
}

export interface IUserResponse {
    status?: number;
    data?:   IUserData;
}

export interface IUserData {
    user?: IUser;
}

export interface IUser {
    id?:        string;
    email?:     string;
    name?:      string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IRegisterRequest {
    email: string,
    password: string,
    name: string
}
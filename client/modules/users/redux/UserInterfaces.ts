import type { sectionTypes } from "../../../common/components/menu/BottomBar";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  status?: number;
  data?: ILoginData;
}

export interface IConfig {
  defaultSection: sectionTypes;
}

export interface ILoginData {
  accessToken?: string;
  refreshToken?: string;
  config?: IConfig;
}

export interface IUserResponse {
  status?: number;
  data?: IUserData;
}

export interface IUserData {
  user?: IUser;
}

export interface IUser {
  id?: string;
  email?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
  config?: IUserConfig;
}

export interface IUserConfig {
  id: string;
  updatedAt: string;
  userId: string;
  defaultSection: sectionTypes;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface IVerifyRequest {
  verifyKey: string;
}

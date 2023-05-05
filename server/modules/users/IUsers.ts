import type { Config, User } from ".prisma/client";

export interface ICreateUserReqBody {
  email: string;
  name: string;
  password: string;
}

export type IUser = (User & { config: Config | null }) | null;

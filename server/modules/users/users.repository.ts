/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 00:53
 */

import { prisma } from "../../utils/prisma/prisma";
import * as bcrypt from "bcrypt";
import type { ICreateUserReqBody } from "./IUsers";

export default class UsersRepository {
  /**
   * This method is used to
   * find user by unique email
   * @param email
   */

  public findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  /**
   * This method is used to
   * find user by unique id
   * @param id
   */

  public findUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * This method is used to
   * create new user
   * @param user
   */
  public createUserByEmailAndPassword(user: ICreateUserReqBody) {
    user.password = bcrypt.hashSync(user.password, 12);
    return prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });
  }

  /**
   * This method is used to
   * verify user account
   * @param userId
   */
  public verifyUser(userId: string) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });
  }
}

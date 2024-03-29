/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 01:08
 */

import { prisma } from "../../utils/prisma/prisma";
import Jwt from "../../utils/jwt/jwt";
import { IaddRefreshTokenToWhitelist } from "./IAuth";

export default class AuthRepository {
  /**
   * This method is used to
   * add refresh token to
   * whitelist db
   * @param data
   */

  public addRefreshTokenToWhitelist(data: IaddRefreshTokenToWhitelist) {
    const jwt = new Jwt();

    if (!data.jti || !data.userId || !data.refreshToken) return;

    return prisma.refreshToken.create({
      data: {
        id: data.jti,
        hashedToken: jwt.hashToken(data.refreshToken),
        userId: data.userId,
      },
    });
  }

  /**
   * This method is used to
   * check if the token sent
   * by the client is in the database.
   * @param id
   */
  public findRefreshTokenById(id: string) {
    return prisma.refreshToken.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * This method is used to
   * delete token after usage
   * @param id
   */

  public deleteRefreshToken(id: string) {
    return prisma.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  }

  /**
   * This method is used to
   * revoke tokens
   * @param userId
   */

  public revokeTokens(userId: string) {
    return prisma.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoked: true,
      },
    });
  }
}

/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 00:53
 */

import { prisma } from "../../utils/prisma/prisma";

export default class ConfigRepository {
  /**
   * This method is used to
   * find config by unique id
   * @param id
   */
  public findConfigById(id: string) {
    return prisma.config.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * This method is used to
   * update config
   * @param userId
   * @param defaultSection
   */
  public update(userId: string, defaultSection: string) {
    return prisma.config.update({
      where: {
        userId: userId,
      },
      data: {
        defaultSection: defaultSection,
      },
    });
  }
}

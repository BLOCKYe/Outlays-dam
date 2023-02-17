/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 23:14
 */

import { prisma } from "../../utils/prisma/prisma";
import { ICategoryCreateData, ICategoryEditData } from "./ICategories";

export default class CategoriesRepository {
  /**
   * This method is used to
   * get all user categories
   * @param userId
   */

  public getUserCategories(userId: string) {
    return prisma.category.findMany({
      orderBy: [
        {
          name: "asc",
        },
      ],
      where: {
        userId: userId,
      },
    });
  }

  /**
   * This method is used to
   * get one category by id
   * @param userId
   * @param categoryId
   */

  public findById(userId: string, categoryId: string) {
    return prisma.category.findFirst({
      where: {
        userId: userId,
        id: categoryId,
      },
    });
  }

  /**
   * This method is used to
   * delete one category by id
   * @param userId
   * @param categoryId
   */

  public deleteById(userId: string, categoryId: string) {
    return prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }

  /**
   * This method is used to
   * edit category by id
   * @param userId
   * @param categoryId
   * @param data
   */

  public editCategory(
    userId: string,
    categoryId: string,
    data: ICategoryEditData
  ) {
    return prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: data.name,
        color: data.color,
      },
    });
  }

  /**
   * This method is used to
   * create new category
   * @param data
   */

  public createCategory(data: ICategoryCreateData) {
    return prisma.category.create({
      data: {
        name: data.name,
        color: data.color,
        userId: data.userId,
      },
    });
  }
}

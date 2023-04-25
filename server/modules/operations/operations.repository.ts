/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:11
 */

import { prisma } from "../../utils/prisma/prisma";
import type { IOperationCreateData, IOperationEditData } from "./IOperations";

export default class OperationsRepository {
  /**
   * This method is used to
   * create new outlay
   * @param data
   */

  public createOperation(data: IOperationCreateData) {
    return prisma.operation.create({
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        value: data.value,
        userId: data.userId,
        type: data.type,
        categories: {
          connect: data.categories,
        },
      },
      include: {
        categories: true,
      },
    });
  }

  /**
   * This method is used to
   * get all user outlays
   * @param userId
   * @param resultsOnPage
   * @param page
   */
  public getUserOperations(userId: string, resultsOnPage = 10, page = 1) {
    return prisma.operation.findMany({
      take: resultsOnPage,
      skip: resultsOnPage * (page - 1),
      orderBy: [
        {
          date: "desc",
        },
      ],
      where: {
        userId: userId,
      },
      include: {
        categories: true,
      },
    });
  }

  /**
   * This method is used to
   * delete one outlay by id
   * @param userId
   * @param operationId
   */

  public deleteById(userId: string, operationId: string) {
    return prisma.operation.delete({
      where: {
        id: operationId,
      },
      include: {
        categories: true,
      },
    });
  }

  /**
   * This method is used to
   * get one outlay by id
   * @param userId
   * @param operationId
   */
  public findById(userId: string, operationId: string) {
    return prisma.operation.findFirst({
      where: {
        userId: userId,
        id: operationId,
      },
      include: {
        categories: true,
      },
    });
  }

  /**
   * This method is used to
   * edit outlay by id
   * @param userId
   * @param operationId
   * @param data
   */
  public editOperation(
    userId: string,
    operationId: string,
    data: IOperationEditData
  ) {
    return prisma.operation.update({
      where: {
        id: operationId,
      },
      data: {
        title: data.title,
        description: data.description,
        date: data.date,
        type: data.type,
        value: data.value,
        categories: {
          set: data.categories,
        },
      },
      include: {
        categories: true,
      },
    });
  }

  /**
   * This method is used to
   * get all user operations
   * by category
   * @param userId
   * @param categoryId
   * @param resultsOnPage
   * @param page
   */
  public getUserOperationsByCategory(
    userId: string,
    categoryId: string,
    resultsOnPage = 10,
    page = 1
  ) {
    return prisma.operation.findMany({
      take: resultsOnPage,
      skip: resultsOnPage * (page - 1),
      orderBy: [
        {
          date: "desc",
        },
      ],
      where: {
        userId: userId,
        categories: {
          some: {
            id: categoryId,
          },
        },
      },
      include: {
        categories: true,
      },
    });
  }
}

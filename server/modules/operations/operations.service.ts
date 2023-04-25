/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 22:37
 */

import type { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../utils/middlewares/auth.middleware";
import Error from "../../utils/Error/Error";
import UsersRepository from "../users/users.repository";
import OperationsRepository from "./operations.repository";
import type { IOperationCreateData, IOperationEditData } from "./IOperations";
import * as yup from "yup";

export default class OperationsService {
  private readonly usersRepository: UsersRepository;
  private readonly operationsRepository: OperationsRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.operationsRepository = new OperationsRepository();
  }

  /**
   * This method is used to
   * create new operation
   * @param req
   * @param res
   */

  public async createOperation(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;

      const { title, description, date, type, value, categories } = req.body;
      // validate body
      const operationSchema = yup.object().shape({
        title: yup.string().min(1).max(50).required(),
        description: yup.string().max(255),
        type: yup.string().max(255).required(),
        date: yup.string().max(255).required(),
        value: yup.number().positive().required(),
        categories: yup.array(),
      });

      if (
        !(await operationSchema.isValid({
          title,
          description,
          date,
          value,
          type,
          categories,
        }))
      ) {
        return Error.res(res, 400, "Invalid req body");
      }

      const reqData: IOperationCreateData = {
        userId: payload.userId,
        title: title,
        value: value,
        type: type,
        date: date,
        description: description,
        categories: categories || [],
      };

      const operationData = await this.operationsRepository.createOperation(
        reqData
      );
      return res.status(200).json({ status: 200, data: operationData });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get user's operations
   * @param req
   * @param res
   */
  public async getOperations(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;

      const query = req.query;
      const parsedQuery = {
        page: Number(query?.page ?? "1"),
        resultsOnPage: Number(query?.resultsOnPage ?? "10"),
      };

      const operations = await this.operationsRepository.getUserOperations(
        payload.userId,
        parsedQuery.resultsOnPage > 50 ? 50 : parsedQuery.resultsOnPage,
        parsedQuery.page
      );
      return res.status(200).json({ status: 200, data: operations });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get user's operations
   * by category id
   * @param req
   * @param res
   * @param categoryId
   */
  public async getCategoryOperations(
    req: NextApiRequest,
    res: NextApiResponse,
    categoryId: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;

      const query = req.query;
      const parsedQuery = {
        page: Number(query?.page ?? "1"),
        resultsOnPage: Number(query?.resultsOnPage ?? "10"),
      };

      const operations =
        await this.operationsRepository.getUserOperationsByCategory(
          payload.userId,
          categoryId,
          parsedQuery.resultsOnPage > 50 ? 50 : parsedQuery.resultsOnPage,
          parsedQuery.page
        );
      return res.status(200).json({ status: 200, data: operations });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get operation by id
   * @param req
   * @param res
   * @param id
   */
  public async getOperation(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;

      const operation: any = await this.operationsRepository.findById(
        payload.userId,
        id
      );
      if (!operation) return Error.res(res, 404, "Operation not found");

      return res.status(200).json({ status: 200, data: operation });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * delete operation by id
   * @param req
   * @param res
   * @param id
   */

  public async deleteOperation(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;

      const operation: any = await this.operationsRepository.deleteById(
        payload.userId,
        id
      );
      if (!operation) return Error.res(res, 404, "Operation not found");

      return res.status(200).json({ status: 200, data: operation });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * edit operation by id
   * @param req
   * @param res
   * @param id
   */

  public async editOperation(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;

      const { title, description, date, value, type, categories } = req.body;

      const reqData: IOperationEditData = {
        title: title,
        description: description,
        date: date,
        type: type,
        value: value,
        categories: categories,
      };

      const operation: any = await this.operationsRepository.editOperation(
        payload.userId,
        id,
        reqData
      );
      if (!operation) return Error.res(res, 404, "Operation not found");

      return res.status(200).json({ status: 200, data: operation });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }
}

/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 19:36
 */

import { NextApiRequest, NextApiResponse } from "next";
import AuthMiddleware from "../../utils/middlewares/auth.middleware";
import Error from "../../utils/Error/Error";
import CategoriesRepository from "./categories.repository";
import { ICategoryCreateData, ICategoryEditData } from "./ICategories";
import * as yup from "yup";

export default class CategoriesService {
  private readonly categoriesServices: CategoriesRepository;

  constructor() {
    this.categoriesServices = new CategoriesRepository();
  }

  /**
   * This method is used to
   * get user's categories
   * @param req
   * @param res
   */

  public async getCategories(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const categories: any = await this.categoriesServices.getUserCategories(
        payload.userId
      );
      return res.status(200).json({ status: 200, data: categories });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get category by id
   * @param req
   * @param res
   * @param id
   */

  public async getCategory(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const category: any = await this.categoriesServices.findById(
        payload.userId,
        id
      );
      if (!category) return Error.res(res, 404, "Category not found");

      return res.status(200).json({ status: 200, data: category });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * edit category by id
   * @param req
   * @param res
   * @param id
   */

  public async editCategory(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const { name, color } = req.body;

      const nameSchema = yup.string().max(32);
      const colorSchema = yup.string().max(32);
      if (!(await nameSchema.isValid(name)))
        return Error.res(res, 400, "Name can have a maximum of 32 characters");
      if (!(await colorSchema.isValid(color)))
        return Error.res(res, 400, "Color can have a maximum of 32 characters");

      const reqData: ICategoryEditData = {
        name: name,
        color: color,
      };

      const category: any = await this.categoriesServices.editCategory(
        payload.userId,
        id,
        reqData
      );
      if (!category) return Error.res(res, 404, "Category not found");

      return res.status(200).json({ status: 200, data: category });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * delete category by id
   * @param req
   * @param res
   * @param id
   */

  public async deleteCategory(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const category: any = await this.categoriesServices.deleteById(
        payload.userId,
        id
      );
      if (!category) return Error.res(res, 404, "Category not found");

      return res.status(200).json({ status: 200, data: category });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * create new outlay
   * @param req
   * @param res
   */

  public async createCategory(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const { name, color } = req.body;
      const nameSchema = yup
        .string()
        .max(32, "Name can have a maximum of 32 characters")
        .required();
      const colorSchema = yup
        .string()
        .max(32, "Color can have a maximum of 32 characters")
        .required();
      if (!(await nameSchema.isValid(name)))
        return Error.res(res, 400, "Invalid name field");
      if (!(await colorSchema.isValid(color)))
        return Error.res(res, 400, "Invalid color field");

      const reqData: ICategoryCreateData = {
        userId: payload.userId,
        name: name,
        color: color,
      };

      const categoryData = await this.categoriesServices.createCategory(
        reqData
      );
      return res.status(200).json({ status: 200, data: categoryData });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }
}

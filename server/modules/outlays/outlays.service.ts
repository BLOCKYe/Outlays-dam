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
import OutlaysRepository from "./outlays.repository";
import type { IOutlayCreateData, IOutlayEditData } from "./IOutlays";
import * as yup from "yup";
import { ICategoryEditData } from "../categories/ICategories";

export default class OutlaysService {
  private readonly usersRepository: UsersRepository;
  private readonly outlaysRepository: OutlaysRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.outlaysRepository = new OutlaysRepository();
  }

  /**
   * This method is used to
   * create new outlay
   * @param req
   * @param res
   */

  public async createOutlay(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const { title, description, date, value, categories } = req.body;
      // validate body
      const outlaySchema = yup.object().shape({
        title: yup.string().min(1).max(20).required(),
        description: yup.string().max(255),
        date: yup.string().max(255).required(),
        value: yup.number().positive().required(),
        categories: yup.array(),
      });

      if (
        !(await outlaySchema.isValid({
          title,
          description,
          date,
          value,
          categories,
        }))
      )
        return Error.res(res, 400, "Invalid req body");

      const reqData: IOutlayCreateData = {
        userId: payload.userId,
        title: title,
        value: value,
        date: date,
        description: description,
        categories: categories || [],
      };

      const outlayData = await this.outlaysRepository.createOutlay(reqData);
      return res.status(200).json({ status: 200, data: outlayData });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get user's outlays
   * @param req
   * @param res
   */

  public async getOutlays(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const outlays = await this.outlaysRepository.getUserOutlays(
        payload.userId
      );
      return res.status(200).json({ status: 200, data: outlays });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * get outlay by id
   * @param req
   * @param res
   * @param id
   */

  public async getOutlay(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const outlay: any = await this.outlaysRepository.findById(
        payload.userId,
        id
      );
      if (!outlay) return Error.res(res, 404, "Outlay not found");

      return res.status(200).json({ status: 200, data: outlay });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * delete outlay by id
   * @param req
   * @param res
   * @param id
   */

  public async deleteOutlay(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const outlay: any = await this.outlaysRepository.deleteById(
        payload.userId,
        id
      );
      if (!outlay) return Error.res(res, 404, "Outlay not found");

      return res.status(200).json({ status: 200, data: outlay });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }

  /**
   * This method is used to
   * edit outlay by id
   * @param req
   * @param res
   * @param id
   */

  public async editOutlay(
    req: NextApiRequest,
    res: NextApiResponse,
    id: string
  ) {
    try {
      const payload = await AuthMiddleware.isAuthenticated(req, res);
      if (!payload) return;
      if (typeof payload === "string") return;

      const { title, description, date, value, categories } = req.body;

      const reqData: IOutlayEditData = {
        title: title,
        description: description,
        date: date,
        value: value,
        categories: categories,
      };

      const outlay: any = await this.outlaysRepository.editOutlay(
        payload.userId,
        id,
        reqData
      );
      if (!outlay) return Error.res(res, 404, "Outlay not found");

      return res.status(200).json({ status: 200, data: outlay });
    } catch (err) {
      return Error.res(res, 500, "Something went wrong");
    }
  }
}

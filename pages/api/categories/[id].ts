/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 23:40
 */

import { NextApiRequest, NextApiResponse } from "next";
import CategoriesService from "../../../server/modules/categories/categories.service";
import Error from "../../../server/utils/Error/Error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  if (!id) return;
  if (typeof id !== "string") return;

  const categoriesRepository = new CategoriesService();

  switch (req.method) {
    case "GET": {
      return categoriesRepository.getCategory(req, res, id);
    }

    case "PUT": {
      return categoriesRepository.editCategory(req, res, id);
    }

    case "DELETE": {
      return categoriesRepository.deleteCategory(req, res, id);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 19:17
 */

import type { NextApiRequest, NextApiResponse } from "next";
import Error from "../../../server/utils/Error/Error";
import CategoriesService from "../../../server/modules/categories/categories.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const categoriesService = new CategoriesService();

  switch (req.method) {
    case "GET": {
      return categoriesService.getCategories(req, res);
    }

    case "POST": {
      return categoriesService.createCategory(req, res);
    }

    default: {
      return Error.res(res, 405, "Forbidden method");
    }
  }
}

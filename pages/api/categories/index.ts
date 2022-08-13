/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 19:17
*/

import {NextApiRequest, NextApiResponse} from "next";
import Error from "../../../server/utils/Error/Error";
import CategoriesRepository from "../../../server/modules/categories/categories.repository";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const categoriesRepository = new CategoriesRepository()

    switch (req.method) {

        case 'GET': {
            return categoriesRepository.getCategories(req, res)
        }

        case 'POST': {
            return categoriesRepository.createCategory(req, res)
        }

        default: {
            return Error.res(res, 405, 'Forbidden method')
        }
    }
}


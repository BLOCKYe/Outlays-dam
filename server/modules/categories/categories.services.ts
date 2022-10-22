/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13/08/2022
 * Time: 23:14
*/

import {PrismaClient} from "@prisma/client";
import {ICategoryCreateData, ICategoryEditData} from "./ICategories";

export default class CategoriesServices {

    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }


    /**
     * This method is used to
     * get all user categories
     * @param userId
     */

    public getUserCategories(userId: string) {
        return this.prisma.category.findMany({
            orderBy: [{
                name: 'asc'
            }],
            where: {
                userId: userId
            }
        })
    }


    /**
     * This method is used to
     * get one category by id
     * @param userId
     * @param categoryId
     */

    public findById(userId: string, categoryId: string) {
        return this.prisma.category.findFirst({
            where: {
                userId: userId,
                id: categoryId
            }
        })
    }


    /**
     * This method is used to
     * delete one category by id
     * @param userId
     * @param categoryId
     */

    public deleteById(userId: string, categoryId: string) {
        return this.prisma.category.delete({
            where: {
                id: categoryId
            }
        })
    }


    /**
     * This method is used to
     * edit category by id
     * @param userId
     * @param categoryId
     * @param data
     */

    public editCategory(userId: string, categoryId: string, data: ICategoryEditData) {
        return this.prisma.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: data.name,
                color: data.color
            }
        })
    }


    /**
     * This method is used to
     * create new category
     * @param data
     */

    public createCategory(data: ICategoryCreateData) {
        return this.prisma.category.create({
            data: {
                name: data.name,
                color: data.color,
                userId: data.userId
            }
        })
    }
}
/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:11
*/

import {prisma} from '../../utils/prisma/prisma'
import {IOutlayCreateData, IOutlayEditData} from "./IOutlays";

export default class OutlaysServices {


    /**
     * This method is used to
     * create new outlay
     * @param data
     */

    public createOutlay(data: IOutlayCreateData) {
        return prisma.outlay.create({
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                value: data.value,
                userId: data.userId,
                categories: {
                    connect: data.categories
                }
            },
            include: {
                categories: true
            }
        })
    }


    /**
     * This method is used to
     * get all user outlays
     * @param userId
     */

    public getUserOutlays(userId: string) {
        return prisma.outlay.findMany({
            orderBy: [{
                date: 'desc'
            }],
            where: {
                userId: userId
            },
            include: {
                categories: true
            }
        })
    }


    /**
     * This method is used to
     * delete one outlay by id
     * @param userId
     * @param outlayId
     */

    public deleteById(userId: string, outlayId: string) {
        return prisma.outlay.delete({
            where: {
                id: outlayId
            },
            include: {
                categories: true
            }
        })
    }


    /**
     * This method is used to
     * get one outlay by id
     * @param userId
     * @param outlayId
     */

    public findById(userId: string, outlayId: string) {
        return prisma.outlay.findFirst({
            where: {
                userId: userId,
                id: outlayId
            },
            include: {
                categories: true
            }
        })
    }


    /**
     * This method is used to
     * edit outlay by id
     * @param userId
     * @param outlayId
     * @param data
     */

    public editOutlay(userId: string, outlayId: string, data: IOutlayEditData) {
        return prisma.outlay.update({
            where: {
                id: outlayId
            },
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                value: data.value,
                categories: {
                    set: data.categories
                }
            },
            include: {
                categories: true
            }
        })
    }
}
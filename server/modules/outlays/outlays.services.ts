/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:11
*/

import {PrismaClient} from "@prisma/client";
import {IOutlayCreateData} from "./IOutlays";

export default class OutlaysServices {
    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    /**
     * This method is used to
     * create new outlay
     * @param data
     */

    public createOutlay(data: IOutlayCreateData) {
        return this.prisma.outlay.create({
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
        return this.prisma.outlay.findMany({
            where: {
                userId: userId
            },
            include: {
                categories: true
            }
        })
    }
}
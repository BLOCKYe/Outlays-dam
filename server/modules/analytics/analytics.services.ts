/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:11
*/

import {PrismaClient} from "@prisma/client";

export default class AnalyticsServices {
    private readonly prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }


    /**
     * This method is used to
     * get user spent amount
     * @param userId
     */

    public getSpentAmount(userId: string) {
        return this.prisma.outlay.aggregate({
            where: {
                userId: userId
            },
           _sum: {
                value: true
           }
        })
    }
}
/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 23:11
*/

import {PrismaClient} from "@prisma/client";
import moment from "moment";

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

    public async getSpentAmount(userId: string) {

        const startDate = moment().startOf('month').format('YYYY-MM-DD')
        const startDateLast = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
        const endDate = moment().endOf('month').format('YYYY-MM-DD')
        const endDateLast = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')

        const current = await this.prisma.outlay.aggregate({
            where: {
                userId: userId,
                date: {
                    lte: endDate,
                    gte: startDate,
                }
            },
            _sum: {
                value: true
            }
        })

        const last = await this.prisma.outlay.aggregate({
            where: {
                userId: userId,
                date: {
                    lte: endDateLast,
                    gte: startDateLast,
                }
            },
            _sum: {
                value: true
            }
        })

        return {current, last}
    }
}
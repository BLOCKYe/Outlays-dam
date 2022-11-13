/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:37
*/

import React from 'react';
import moment from "moment";
import {useSelector} from "react-redux";
import {selectLastSpending} from "../../analytics/redux/analyticsSlice";

const Header: React.FC = () => {

    const lastSpending = useSelector(selectLastSpending)


    /**
     * This method is used to
     * return difference between
     * current and last month
     */

    const calculateDiff = (): number => {
        const current: number = lastSpending?.current?._sum?.value || 0
        const last: number = lastSpending?.last?._sum?.value || 0

        return current - last
    }

    return (
        <div className={'w-full bg-d p-5 border-[1px] border-d-lighter rounded-md'}>
            <div className={'text-sm'}>
                Wydatki w tym miesiącu
            </div>

            <div className={'flex flex-wrap gap-3 items-center mt-1'}>
                <div className={'font-bold text-2xl text-w'}>
                    {lastSpending?.current?._sum?.value || 0} PLN
                </div>
                <div className={'py-1 px-3 text-slate-700 bg-slate-300 font-bold text-xs rounded'}>
                    {calculateDiff() >= 0 ? '+' : '-'} {Math.abs(calculateDiff())} PLN
                </div>
            </div>

            <div className={'text-sm text-w-darker mt-1'}>
                1 - {moment().format('DD MMMM YYYY')}
            </div>
        </div>
    );
};

export default Header;

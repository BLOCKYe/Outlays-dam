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

    return (
        <div className={'w-full'}>
            <div>
                Wydatki w tym miesiącu
            </div>

            <div className={'flex flex-wrap gap-3 items-center'}>
                <div className={'font-bold text-3xl'}>
                    {lastSpending?._sum?.value} PLN
                </div>
                <div className={'py-1 px-3 bg-c-light text-c font-bold text-xs rounded'}>
                    +0 PLN
                </div>
            </div>

            <div className={'text-xs text-d-light'}>
                {moment().format('MMMM YYYY')}
            </div>
        </div>
    );
};

export default Header;

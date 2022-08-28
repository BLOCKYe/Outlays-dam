/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:48
*/

import React from 'react';
import {IOutlayData} from "../redux/OutlaysInterfaces";

interface OutlayItemProps {
    data: IOutlayData
}

const OutlayItem: React.FC<OutlayItemProps> = (props) => {
    return (
        <div className={'grid place-items-center grid-cols-3 text-sm'}>
            <div className={'font-bold justify-self-start'}>
                {props.data.title}
            </div>

            <div className={'py-1 px-3 bg-pink-100 text-pink-800 text-xs rounded-full justify-self-end'}>
                Przyjemności
            </div>

            <div className={'justify-self-end font-bold'}>
                -{props.data.value} PLN
            </div>
        </div>
    );
};

export default OutlayItem;

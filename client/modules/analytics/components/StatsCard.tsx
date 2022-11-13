/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12.11.2022
 * Time: 18:18
*/

import React from 'react';
import {MdQueryStats} from "react-icons/md";

interface IStatsCard {
    title: string
    description?: string
    value: string | number
}

const StatsCard: React.FC<IStatsCard> = (props) => {
    return (
        <div className={'bg-d p-5 border-[1px] border-d-lighter rounded-md'}>
            <div className={'text-md font-bold'}>
                {props.title}
            </div>
            <div className={'text-sm text-w-darker mt-3'}>
                {props.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, magni!'}
            </div>
            <div className={'text-3xl font-bold mt-3'}>
                {props.value}
            </div>

        </div>
    );
};

export default StatsCard;

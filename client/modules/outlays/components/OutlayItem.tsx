/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:48
*/

import React, {useEffect, useRef, useState} from 'react';
import {IOutlayData} from "../redux/OutlaysInterfaces";
import {ICategoryData} from "../../categories/redux/CategoriesInterfaces";
import moment, {duration} from "moment";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import autoAnimate from "@formkit/auto-animate";
import {Tooltip} from "@chakra-ui/react";

interface OutlayItemProps {
    data: IOutlayData
}

const OutlayItem: React.FC<OutlayItemProps> = (props) => {

    const [moreInformation, setMoreInformation] = useState<boolean>(false)


    /**
     * This method is used to
     * render styles
     * for different variants
     * @param color
     */

    const categoryColorFactory = (color: string): string => {
        switch (color) {
            case 'Purple': {
                return 'bg-purple-100 text-purple-800'
            }

            case 'Orange': {
                return 'bg-orange-100 text-orange-800'
            }

            case 'Blue': {
                return 'bg-sky-100 text-sky-800'
            }

            case 'Pink': {
                return 'bg-pink-100 text-pink-800'
            }

            case 'Emerald': {
                return 'bg-emerald-100 text-emerald-800'
            }

            default: {
                return 'bg-gray-100 text-gray-800'
            }
        }
    }


    return (
        <div onClick={() => setMoreInformation(!moreInformation)} className={'py-3'}>
            <div className={'grid place-items-center item-cols cursor-pointer'}>

                <div className={'w-[12px] rounded-full h-[12px] bg-d-lighter'}/>

                <div className={'justify-self-start text-sm'}>
                    {props.data.title}
                </div>


                <div className={'justify-self-end text-sm text-w'}>
                    -{props.data.value} <span className={'text-xs text-w-darker font-normal'}>PLN</span>
                </div>
            </div>
        </div>

    );
};

export default OutlayItem;

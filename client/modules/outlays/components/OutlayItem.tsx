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
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current, {duration: 200})
    }, [parent])

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
        <div ref={parent} onClick={() => setMoreInformation(!moreInformation)} className={'py-3'}>
            <div className={'grid place-items-center item-cols cursor-pointer'}>
                <div className={'font-bold justify-self-start text-xs'}>
                    {props.data.title}
                </div>

                {/* <--- Render categories ---> */}
                <div className={'flex flex-wrap gap-1 justify-self-end justify-end'}>
                    {[].slice.call(props.data.categories).map((category: ICategoryData) =>
                        <Tooltip key={category.id} label={category.name}>
                            <div key={category.id} className={'py-1 px-3 font-bold rounded text-xs justify-self-end ' + categoryColorFactory(category.color)}>
                                {props.data.categories?.length > 1 && (category.name[0])}
                                {props.data.categories?.length === 1 && (category.name)}
                            </div>
                        </Tooltip>
                    )}
                </div>

                <div className={'justify-self-end text-sm font-bold'}>
                    -{props.data.value} <span className={'text-xs text-d-light font-normal'}>PLN</span>
                </div>
            </div>


            {/* <--- More information (description, date) ---> */}
            {moreInformation && (
                <div className={'mt-1'}>
                    <div className={'text-d-light text-xs'}>
                        {moment(props.data.date).format('Do MMMM YYYY')}
                    </div>

                    <div className={'text-xs'}>
                        {props.data.description}
                    </div>
                </div>
            )}
        </div>

    );
};

export default OutlayItem;

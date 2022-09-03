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
                return 'bg-blue-100 text-blue-800'
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

                <div className={'flex flex-wrap gap-1 justify-self-end'}>
                    {[].slice.call(props.data.categories).map((category: ICategoryData) =>
                        <div key={category.id}
                            className={'py-1 px-3 rounded text-xs justify-self-end ' + categoryColorFactory(category.color)}>
                            {category.name}
                        </div>
                    )}
                </div>

                <div className={'justify-self-end font-bold'}>
                    -{props.data.value} <span className={'text-xs text-d-light font-normal'}>PLN</span>
                </div>
            </div>


            {/* <--- More information (description, date) ---> */}
            {moreInformation && (
                <div className={'mt-1'}>
                    <div className={'text-d-light text-xs'}>
                        {moment(props.data.date).format('MMMM Do YYYY, h:mm:ss a')}
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

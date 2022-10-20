/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 21.10.2022
 * Time: 00:33
*/

import React, {useEffect, useRef} from 'react';
import {BsCheckLg} from "react-icons/bs";
import autoAnimate from "@formkit/auto-animate";
import {IColorItemData} from "../../categories/utils/CategoryColors";

interface IColorItem {
    selectedColor: string
    selectColor: (field: string, value: string) => void
    data: IColorItemData
}

const ColorItem: React.FC<IColorItem> = (props) => {

    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current, {duration: 100})
    }, [parent])

    /**
     * This method is used to
     * render styles
     * for different variants
     * @param color
     */

    return (
        <div onClick={() => props.selectColor('color', props.data.name)} ref={parent}
            className={'py-1 cursor-pointer px-3 font-bold rounded text-xs flex gap-2 items-center justify-self-end ' + props.data.styles}>
            {props.selectedColor === props.data.name && <BsCheckLg/>}
            {props.data?.label}
        </div>
    );
};

export default ColorItem;

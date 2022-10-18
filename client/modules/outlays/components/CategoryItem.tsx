/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 05/09/2022
 * Time: 23:38
*/

import React, {useEffect, useRef} from 'react';
import {ICategoryData} from "../../categories/redux/CategoriesInterfaces";
import {BsCheckLg} from "react-icons/bs";
import autoAnimate from "@formkit/auto-animate";
import CategoryColors from "../../categories/utils/CategoryColors";

interface ICategoryItem {
    selectedCategories: string[]
    selectedCategory: (id: string) => void
    data: ICategoryData
}

const CategoryItem: React.FC<ICategoryItem> = (props) => {

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
        <div onClick={() => props.selectedCategory(props.data.id)} ref={parent} className={'py-1 cursor-pointer px-3 font-bold rounded text-xs flex gap-2 items-center justify-self-end ' + CategoryColors.ColorBuilder(props.data.color, "dark", "bg") + " " + CategoryColors.ColorBuilder(props.data.color, "default", "text")}>
            {props.selectedCategories.includes(props.data.id) && <BsCheckLg />}
            {props.data?.name}
        </div>
    );
};

export default CategoryItem;

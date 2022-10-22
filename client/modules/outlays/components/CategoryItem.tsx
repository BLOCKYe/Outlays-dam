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

    /**
     * This method is used to
     * render styles
     * for different variants
     * @param color
     */

    return (
        <div onClick={() => props.selectedCategory(props.data.id)} className={'py-1 hover:opacity-100 transition-all cursor-pointer px-3 font-bold rounded text-sm flex gap-2 items-center w-full ' + CategoryColors.ColorBuilder(props.data.color, "dark", "bg") + " " + CategoryColors.ColorBuilder(props.data.color, "default", "text") + " " + (props.selectedCategories.includes(props.data.id) ? 'opacity-100' : 'opacity-50')}>
            {props.selectedCategories.includes(props.data.id) && <BsCheckLg />}
            {props.data?.name}
        </div>
    );
};

export default CategoryItem;

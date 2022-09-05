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
        <div onClick={() => props.selectedCategory(props.data.id)} ref={parent}
            className={'py-1 cursor-pointer px-3 font-bold rounded text-xs flex gap-2 items-center justify-self-end ' + categoryColorFactory(props.data.color)}>
            {props.selectedCategories.includes(props.data.id) && <BsCheckLg />}
            {props.data?.name}
        </div>
    );
};

export default CategoryItem;

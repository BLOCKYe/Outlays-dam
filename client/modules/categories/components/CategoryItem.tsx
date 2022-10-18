/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 19.10.2022
 * Time: 00:03
*/

import React from 'react';
import {ICategoryData} from "../redux/CategoriesInterfaces";
import {Tooltip} from "@chakra-ui/react";
import CategoryColors from "../utils/CategoryColors";

interface ICategoryItemProps {
    data: ICategoryData
}

const CategoryItem: React.FC<ICategoryItemProps> = (props) => {
    return (
        <div className={'py-3 transition-all items-center text-sm grid item-cols'}>

            <div
                className={'w-[10px] rounded-lg h-[10px] ' + CategoryColors.ColorBuilder(props.data.color, 'default', 'bg')}/>

            <div className={'text-w'}>
                {props.data.name}
            </div>
        </div>
    );
};

export default CategoryItem;

/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 18.10.2022
 * Time: 23:21
*/

import React from 'react';
import {useSelector} from "react-redux";
import {selectCategories} from "../redux/categoriesSlice";
import {IoList} from "react-icons/io5";
import {ICategoryData} from "../redux/CategoriesInterfaces";
import CategoryItem from "./CategoryItem";
import {Skeleton} from "@chakra-ui/react";

const CategoriesList = () => {
    const categories = useSelector(selectCategories)

    return (
        <div className={'bg-d p-5 border-[1px] border-d-lighter mb-20 rounded-md'}>
            <div className={'text-lg font-bold flex gap-2 items-center'}>
                <IoList/> Twoje kategorie
            </div>
            <div className={'text-sm text-w-darker mt-3'}>
                Lista wszystkich twoich kategorii. W tym miejscu możesz dodać nowe lub edytować istniejące kategorie.
            </div>

            {/* <--- Display categories ---> */}
            <div className={'grid mt-3 divide-y divide-d-lighter'}>
                {categories && categories.map((category: ICategoryData) =>
                    <CategoryItem data={category} key={category.id}/>
                )}

                {!categories && (
                    <div className={'grid gap-1'}>
                        <Skeleton startColor='black' endColor='gray' height={'44px'}/>
                        <Skeleton startColor='black' endColor='gray' height={'44px'}/>
                        <Skeleton startColor='black' endColor='gray' height={'44px'}/>
                        <Skeleton startColor='black' endColor='gray' height={'44px'}/>
                        <Skeleton startColor='black' endColor='gray' height={'44px'}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesList;

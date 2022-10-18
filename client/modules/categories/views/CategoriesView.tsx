/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:01
*/

import React from 'react';
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import TopBar from "../../../common/components/menu/TopBar";
import BottomBar from "../../../common/components/menu/BottomBar";
import CategoriesList from "../components/CategoriesList";
import AddCategoryButton from "../components/AddCategoryButton";

const CategoriesView = () => {
    return (
        <>
            <TopBar/>
            <MainWrapper>
                <AddCategoryButton text={'Nowa kategoria'}/>

                <div className={'pt-3'}>
                    <CategoriesList/>
                </div>

            </MainWrapper>
            <BottomBar selected={'CATEGORIES'}/>
        </>
    );
};

export default CategoriesView;

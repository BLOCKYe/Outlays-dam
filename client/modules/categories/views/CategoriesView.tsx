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
import Header from "../../outlays/components/Header";
import AddOutlayButton from "../../outlays/components/AddOutlayButton";

const CategoriesView = () => {
    return (
        <>
            <TopBar/>
            <MainWrapper>
                <AddOutlayButton text={'Nowa kategoria'}/>

            </MainWrapper>
            <BottomBar selected={'CATEGORIES'}/>
        </>
    );
};

export default CategoriesView;

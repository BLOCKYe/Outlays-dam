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

const AnalyticsView = () => {
    return (
        <>
            <TopBar/>
            <MainWrapper>
                <Header/>

            </MainWrapper>
            <BottomBar selected={'STATS'}/>
        </>
    );
};

export default AnalyticsView;

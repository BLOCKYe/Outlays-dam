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
import Header from "../components/Header";
import AddButton from "../../../common/components/buttons/AddButton";
import BottomBar from "../../../common/components/menu/BottomBar";
import HistoryList from "../components/HistoryList";

const HomeView = () => {
    return (
        <>
            <TopBar />
            <MainWrapper>
                <Header />

                <div className={'pt-10'}>
                    <AddButton text={'Dodaj wydatek'} />
                </div>

                <div className={'pt-10'}>
                    <HistoryList />
                </div>
            </MainWrapper>
            <BottomBar selected={'HISTORY'} />
        </>
    );
};

export default HomeView;

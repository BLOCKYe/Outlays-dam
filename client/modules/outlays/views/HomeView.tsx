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
import {useDispatch} from "react-redux";
import {setLoading} from "../../../common/redux/UISlice";

const HomeView = () => {
    const dispatch = useDispatch(

    )
    return (
        <>
            <TopBar />
            <MainWrapper>
                <div className={'p-2'} onClick={() => dispatch(setLoading(true))}>
                    Strona główna
                </div>
            </MainWrapper>
        </>
    );
};

export default HomeView;

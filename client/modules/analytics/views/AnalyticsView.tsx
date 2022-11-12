/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:01
*/

import React, {useEffect} from 'react';
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import TopBar from "../../../common/components/menu/TopBar";
import BottomBar from "../../../common/components/menu/BottomBar";
import Header from "../../outlays/components/Header";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../common/redux/UISlice";
import {getCookie} from "cookies-next";
import {setToken} from "../../users/redux/userSlice";
import {fetchUserProfile} from "../../users/redux/UserRepository";
import {fetchLastSpending} from "../redux/AnalyticsRepository";

const AnalyticsView = () => {
    const dispatch: any = useDispatch()

    const fetchData = async () => {
        await dispatch(setLoading(true))
        const token = getCookie('token');
        dispatch(setToken(token))
        await dispatch(fetchUserProfile())
        dispatch(fetchLastSpending())

        await dispatch(setLoading(false))
    }

    useEffect(() => {
        fetchData().then()
    }, [])


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

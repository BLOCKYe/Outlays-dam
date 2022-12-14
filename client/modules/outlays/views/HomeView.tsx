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
import Header from "../components/Header";
import AddOutlayButton from "../components/AddOutlayButton";
import BottomBar from "../../../common/components/menu/BottomBar";
import HistoryList from "../components/HistoryList";
import {fetchCategories} from "../../categories/redux/CategoriesRepository";
import {fetchLastSpending} from "../../analytics/redux/AnalyticsRepository";
import {fetchOutlays} from "../redux/OutlaysRepository";
import {setLoading} from "../../../common/redux/UISlice";
import {useDispatch} from "react-redux";
import AddCategoryButton from "../../categories/components/AddCategoryButton";

const HomeView = () => {
    const dispatch: any = useDispatch()

    const fetchData = async () => {
        await dispatch(setLoading(true))

        const promises = [
            dispatch(fetchLastSpending()),
            dispatch(fetchOutlays()),
            dispatch(fetchCategories())
        ]

        await Promise.all(promises)
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

                <div className={'pt-3 flex gap-3 flex-wrap sm:flex-nowrap'}>
                    <AddOutlayButton text={'Nowy wydatek'}/>
                    <AddCategoryButton text={'Nowa kategoria'}/>
                </div>

                <div className={'pt-3'}>
                    <HistoryList/>
                </div>
            </MainWrapper>
            <BottomBar selected={'HISTORY'}/>
        </>
    );
};

export default HomeView;

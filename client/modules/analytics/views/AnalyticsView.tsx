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
import {fetchLastSpending} from "../redux/AnalyticsRepository";
import BarChart from "../components/BarChart";
import StatsCard from "../components/StatsCard";

const AnalyticsView = () => {
    const dispatch: any = useDispatch()

    const fetchData = async () => {
        await dispatch(setLoading(true))
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

                <div className={'mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3'}>
                    <StatsCard title={'Wykonanych akcji'} value={'62'}/>
                    <StatsCard title={'Wypełnionych celów'} value={'3'}/>
                    <StatsCard title={'Współczynnik oszczędności'} value={'36.12%'}/>
                    <StatsCard title={'Ograniczonych wydatków'} value={'-512 PLN'}/>
                </div>

                <div className={'mt-3 grid lg:grid-cols-2 gap-3 mb-20'}>
                    <BarChart title={'Wydatki na postawie kategorii'}/>
                    <BarChart title={'Roczne wydatki'}/>
                </div>


            </MainWrapper>
            <BottomBar selected={'STATS'}/>
        </>
    );
};

export default AnalyticsView;

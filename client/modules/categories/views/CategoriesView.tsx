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
import CategoriesList from "../components/CategoriesList";
import AddCategoryButton from "../components/AddCategoryButton";
import {store} from "../../../common/redux/store";
import {fetchCategories} from "../redux/CategoriesRepository";
import {getCookie} from "cookies-next";
import {setToken} from "../../users/redux/userSlice";
import {fetchUserProfile} from "../../users/redux/UserRepository";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../common/redux/UISlice";
import AddOutlayButton from "../../outlays/components/AddOutlayButton";

const CategoriesView = () => {
    const dispatch: any = useDispatch()

    const fetchData = async () => {
        await dispatch(setLoading(true))
        const token = getCookie('token');
        dispatch(setToken(token))
        await dispatch(fetchUserProfile())
        await dispatch(fetchCategories())

        await dispatch(setLoading(false))

    }

    useEffect(() => {
        fetchData().then()
    }, [])


    return (
        <>
            <TopBar/>
            <MainWrapper>
                <div className={'pt-3 flex gap-3 flex-wrap sm:flex-nowrap'}>
                    <AddCategoryButton text={'Nowa kategoria'}/>
                    <AddOutlayButton text={'Nowy wydatek'}/>
                </div>

                <div className={'pt-3'}>
                    <CategoriesList/>
                </div>

            </MainWrapper>
            <BottomBar selected={'CATEGORIES'}/>
        </>
    );
};

export default CategoriesView;

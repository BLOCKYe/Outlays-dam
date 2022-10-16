/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:51
*/

import type {NextPage} from 'next'
import Head from 'next/head'
import LoginView from "../../client/modules/users/views/LoginView";
import RegisterView from "../../client/modules/users/views/RegisterView";
import HomeView from "../../client/modules/outlays/views/HomeView";
import {wrapper} from "../../client/common/redux/store";
import {getCookie} from "cookies-next";
import {fetchUserProfile} from "../../client/modules/users/redux/UserRepository";
import axios from "axios";
import {fetchOutlays} from "../../client/modules/outlays/redux/OutlaysRepository";
import {fetchCategories} from "../../client/modules/categories/redux/CategoriesRepository";
import {setToken} from "../../client/modules/users/redux/userSlice";
import Router from "next/router";
import Paths from "../../client/common/router/paths";
import AuthMiddleware from "../../client/common/axios/authMiddleware";
import {fetchLastSpending} from "../../client/modules/analytics/redux/AnalyticsRepository";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Strona głowna - Outlays Dam - monitoruj swoje wydatki</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <HomeView/>

        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req, res}) => {
        const auth = new AuthMiddleware(req, res).checkToken()
        if (!auth) {
            return {
                redirect: {
                    permanent: false,
                    destination: Paths.LOGIN
                }
            }
        }

        await store.dispatch(fetchUserProfile())
        await store.dispatch(fetchLastSpending())
        await store.dispatch(fetchOutlays())
        await store.dispatch(fetchCategories())

        return {
            props: {},
        };
    }
);

export default Home

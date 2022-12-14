/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:51
*/

import type {NextPage} from 'next'
import Head from 'next/head'
import HomeView from "../../client/modules/outlays/views/HomeView";
import AuthMiddleware from "../../client/common/axios/authMiddleware";
import {useEffect} from "react";

const Home: NextPage = () => {

    useEffect(() => {
        AuthMiddleware.checkToken().then()
    }, [])

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


export default Home

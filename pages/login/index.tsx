/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:51
*/

import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import LoginView from "../../client/modules/users/views/LoginView";
import {wrapper} from "../../client/common/redux/store";
import {getCookie, getCookies} from "cookies-next";


const Login: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Logowanie - Outlays Dam - monitoruj swoje wydatki</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <LoginView />

        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req, res}) => {

        const token = getCookie('token', {req, res});

        if (token) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/home`
                },
            };
        }

        return {
            props: {},
        };
    }
);

export default Login




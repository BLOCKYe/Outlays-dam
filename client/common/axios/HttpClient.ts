/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:15
*/


import axios, {AxiosError} from "axios";
import Router from "next/router";
import Paths from "../router/paths";
import {store} from "../redux/store";
import {removeCookies} from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:3000'

const httpClient = axios.create({
    baseURL: API_URL,
    timeout: 5000,
})


/**
 * Auth config
 */

httpClient.interceptors.request.use(
    async config => {
        const state = store.getState()

        config.headers = {
            "Content-Type": "application/json",
            'Authorization': `${state.user.token}`,
        }

        return config
    },
    (error: AxiosError) => {
        Promise.reject(error).then()
    }
)


/**
 * Auth error handler
 */

httpClient.interceptors.response.use(function (response) {
    return response;
}, async function (error: AxiosError) {
    if (error.response?.status === 401 || error.response?.status === 403) {
        removeCookies('token')
        await Router.push(Paths.LOGIN)
        return Promise.resolve(error.response)
    } else {
        return Promise.reject(error)
    }
})

export default httpClient
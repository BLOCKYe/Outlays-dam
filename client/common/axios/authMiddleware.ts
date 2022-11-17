/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 16.10.2022
 * Time: 00:30
*/

import {getCookie} from "cookies-next";
import {store} from "../redux/store";
import {setToken} from "../../modules/users/redux/userSlice";
import {fetchUserProfile} from "../../modules/users/redux/UserRepository";

export default class AuthMiddleware {

    /**
     * This method is used to
     * check token from cookies
     */

    public static async checkToken(): Promise<void> {
        const token = getCookie('token');
        await store.dispatch(setToken(token))
        await store.dispatch(fetchUserProfile())
    }
}
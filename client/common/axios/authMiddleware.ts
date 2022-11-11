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

    private readonly req: any
    private readonly res: any

    constructor(req: any, res: any) {

        this.req = req;
        this.res = res
    }


    /**
     * This method is used to
     * check token from cookies
     */

    public async checkToken(): Promise<boolean> {
        const req = this.req
        const res = this.res

        const token = getCookie('token', {req, res});
        if (!token) return false

        store.dispatch(setToken(token))
        try {
            await store.dispatch(fetchUserProfile())
            return true
        } catch {
            return false
        }


    }
}
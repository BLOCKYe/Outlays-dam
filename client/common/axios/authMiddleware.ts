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

    public checkToken(): boolean {
        const req = this.req
        const res = this.res

        const token = getCookie('token', {req, res});
        if (token) {
            store.dispatch(setToken(token))
            return true
        } else {
            return false
        }
    }
}
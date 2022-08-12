/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12/08/2022
 * Time: 00:19
*/

import {User} from "../../../generated-interfaces";
import { verify, sign } from 'jsonwebtoken'
import {IGenerateTokens} from "./IJwt";
import * as crypto from "crypto";

export default class Jwt {

    /**
     * This method is used to
     * generate access token
     * @param user
     */

    private generateAccessToken(user: User): string | undefined {

        const JWTSecretKey: string | undefined = process.env.JWT_ACCESS_SECRET
        if(!JWTSecretKey) return

        return sign({ userId: user.id }, JWTSecretKey, {
            expiresIn: '5m',
        });
    }


    /**
     * This method is used to
     * generate refresh token
     * @param user
     * @param jti
     */

    private generateRefreshToken(user: User, jti: string): string | undefined {

        const JWTRefreshKey: string | undefined = process.env.JWT_REFRESH_SECRET
        if(!JWTRefreshKey) return

        return sign({
            userId: user.id,
            jti
        }, JWTRefreshKey, {
            expiresIn: '8h',
        });
    }


    /**
     * This method is used to
     * generate tokens
     * @param user
     * @param jti
     */

    public generateTokens(user: User, jti: string): IGenerateTokens {
        const accessToken = this.generateAccessToken(user)
        const refreshToken = this.generateRefreshToken(user, jti)

        return {
            accessToken,
            refreshToken
        }
    }


    /**
     * This method is used to
     * hash token
     * @param token
     */

    public hashToken(token: string): string {
        return crypto.createHash('sha512').update(token).digest('hex');
    }
}
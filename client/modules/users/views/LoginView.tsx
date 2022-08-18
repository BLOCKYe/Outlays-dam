/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:49
*/

import React from 'react';
import Image from "next/image";
import Button from "../../../common/components/buttons/Button";
import Input from "../../../common/components/inputs/Input";

const LoginView = () => {
    return (
        <div className={'w-full min-h-screen p-3 mb:p-10 grid justify-center pt-10 md:pt-20'}>
            <div className={'w-full max-w-xl'}>

                <div className={'mt-5 text-center'}>
                    <div className={'text-3xl font-bold'}>
                        Outlays Dam
                    </div>

                    <div className={'mt-2'}>
                        Zaloguj się na swoje konto
                    </div>
                </div>

                <div className={'mt-10 grid gap-2'}>
                    <Input placeholder={'Email'}/>
                    <Input placeholder={'Hasło'}/>
                </div>

                <div className={'mt-10 grid gap-2'}>
                    <Button type={'CONTAINED'} text={'Zaloguj'}/>
                </div>

            </div>
        </div>
    );
};

export default LoginView;

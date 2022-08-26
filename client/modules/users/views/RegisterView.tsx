/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:49
*/

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";

const RegisterView = () => {
    return (
        <MainWrapper>

            <Link href={'/'}>
                <div className={'relative max-w-[250px] mx-auto'}>
                    <Image src={'/logo.svg'} width={200} height={200} layout={'responsive'}
                        alt={'Outlays Dam'} />
                </div>
            </Link>

            <div className={'mt-5 text-center'}>
                <div className={'text-3xl font-bold'}>
                    Outlays Dam
                </div>

                <div className={'mt-2'}>
                    Utwórz konto
                </div>
            </div>

        </MainWrapper>
    );
};

export default RegisterView;

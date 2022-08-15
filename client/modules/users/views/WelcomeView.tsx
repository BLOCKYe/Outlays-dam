/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:48
*/

import React from 'react';
import Image from "next/image";

const WelcomeView = () => {
    return (
        <div className={'w-full min-h-screen p-3 mb:p-10 grid justify-center pt-10 md:pt-20'}>
            <div className={'w-full max-w-xl'}>

                <div className={'relative max-w-[250px] mx-auto'}>
                    <Image src={'/welcome-image.svg'} width={200} height={200} layout={'responsive'}
                        alt={'Outlays Dam'} />
                </div>

                <div className={'mt-5 text-center'}>
                    <div className={'text-3xl font-bold'}>
                        Outlays Dam
                    </div>

                    <div className={'mt-2'}>
                        Monitoruj swoje wydatki
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WelcomeView;

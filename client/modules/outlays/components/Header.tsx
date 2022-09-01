/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:37
*/

import React from 'react';

const Header: React.FC = () => {
    return (
        <div className={'w-full'}>
            <div>
                Wydatki
            </div>

            <div className={'flex flex-wrap gap-3 items-center'}>
                <div className={'font-bold text-3xl'}>
                    5 621 PLN
                </div>
                <div className={'py-1 px-3 bg-c-light text-c font-bold text-xs rounded'}>
                    +452 PLN
                </div>
            </div>

            <div className={'text-xs text-d-light'}>
                sierpień 2022
            </div>
        </div>
    );
};

export default Header;

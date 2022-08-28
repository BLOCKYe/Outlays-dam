/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 21/08/2022
 * Time: 02:03
*/

import React from 'react';

interface IMainWrapperProps {
    children: React.ReactNode;
}

const MainWrapper: React.FC<IMainWrapperProps> = (props) => (
    <div className={'p-3 mb:p-10 grid pt-10 md:pt-14 place-items-center'}>
        <div className={'w-full max-w-md'}>
            {props.children}
        </div>
    </div>
);

export default MainWrapper;
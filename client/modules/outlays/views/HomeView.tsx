/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:01
*/

import React from 'react';
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import {useSelector} from "react-redux";
import {selectUserProfile} from "../../users/redux/userSlice";

const HomeView = () => {

    const user = useSelector(selectUserProfile)

    return (
        <MainWrapper>
            Strona główna

            <div className={'p-2'}>
                {user?.name}
            </div>
        </MainWrapper>
    );
};

export default HomeView;

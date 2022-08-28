/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 27/08/2022
 * Time: 15:35
*/

import React from 'react';
import {useSelector} from "react-redux";
import {selectUserProfile} from "../../../modules/users/redux/userSlice";
import {Progress} from "@chakra-ui/react";
import {selectLoading} from "../../redux/UISlice";

const TopBar: React.FC = () => {
    // current logged-in user
    const user = useSelector(selectUserProfile)
    const loading = useSelector(selectLoading)

    return (
        <>
            <div className={'bg-w-dark px-5 py-2 grid place-items-center'}>
                <div className={'max-w-md flex gap-2 flex-wrap w-full'}>
                    <div className={'text-sm pt-1'}>
                        Witaj
                    </div>

                    <div className={'font-bold text-xl'}>
                        {user?.name} 👋
                    </div>
                </div>
            </div>
            <Progress colorScheme='orange' className={`w-full max-h-[2px] ${loading ? 'opacity-100' : 'opacity-0'}`} size='xs' isIndeterminate />
        </>
    );
};

export default TopBar;

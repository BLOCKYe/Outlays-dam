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
import {Progress, Tooltip} from "@chakra-ui/react";
import {selectLoading} from "../../redux/UISlice";
import {AiOutlineLogout} from "react-icons/ai";
import {removeCookies} from "cookies-next";
import {useRouter} from "next/router";
import Paths from "../../router/paths";

const TopBar: React.FC = () => {
    // current logged-in user
    const user = useSelector(selectUserProfile)
    const loading = useSelector(selectLoading)
    const router = useRouter()

    /**
     *
     */

    const logout = (): void => {
        removeCookies('token')
        router.push(Paths.LOGIN)
    }

    return (
        <>
            <div className={'bg-w-dark px-5 py-2 grid place-items-center'}>
                <div className={'flex max-w-lg items-center justify-between gap-2 w-full'}>
                    <div className={'flex gap-2 flex-wrap w-full'}>
                        <div className={'text-sm pt-1'}>
                            Witaj
                        </div>

                        <div className={'font-bold text-xl'}>
                            {user?.name} 👋
                        </div>
                    </div>

                    <Tooltip label={'Wyloguj się'}>
                        <div className={'cursor-pointer p-2 hover:bg-w-darker rounded-full transition-all'}
                            onClick={() => logout()}>
                            <AiOutlineLogout/>
                        </div>
                    </Tooltip>
                </div>
            </div>
            <Progress colorScheme='orange' className={`w-full max-h-[2px] ${loading ? 'opacity-100' : 'opacity-0'}`}
                size='xs' isIndeterminate/>
        </>
    );
};

export default TopBar;

/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:55
*/

import React from 'react';
import {BiCategory} from "react-icons/bi";
import {MdHistoryEdu, MdOutlineStarPurple500, MdQueryStats} from "react-icons/md";
import Paths from "../../router/paths";
import Link from "next/link";
import Image from "next/image";

interface IBottomBarProps {
    selected: tabsTypes
}

export type tabsTypes = 'HISTORY' | 'CATEGORIES' | 'STATS' | 'GOALS'

export interface IBottomBarParam {
    icon: React.ReactNode;
    tab: tabsTypes;
    link: string
    name?: string
}

const BottomBar: React.FC<IBottomBarProps> = (props) => {

    /**
     * This factory is used to
     * render different styles
     * for current section
     * @param selected
     * @param local
     */

    const currentSectionsFactory = (selected: tabsTypes, local: tabsTypes): string => {
        const selectedStyles: string = 'box-content p-2 lg:p-2 lg:px-10 transition-all bg-d-lighter cursor-pointer rounded-full lg:rounded flex items-center gap-3'
        const defaultStyles: string = 'box-content p-2 lg:p-2 lg:px-10 transition-all cursor-pointer rounded-full lg:rounded text-w-darker hover:bg-d-lighter hover:text-w flex items-center gap-3'

        if (selected === local) return selectedStyles
        else return defaultStyles
    }


    /**
     * Menu params
     */

    const bottomBarParams: IBottomBarParam[] = [
        {
            icon: <MdHistoryEdu/>,
            tab: 'HISTORY',
            link: Paths.HISTORY,
            name: 'Wydatki'
        },
        {
            icon: <BiCategory/>,
            tab: 'CATEGORIES',
            link: Paths.CATEGORIES,
            name: 'Kategorie'
        },
        {
            icon: <MdQueryStats/>,
            tab: 'STATS',
            link: Paths.STATS,
            name: 'Statystyki'
        },
        {
            icon: <MdOutlineStarPurple500/>,
            tab: 'GOALS',
            link: Paths.STATS,
            name: 'Cele'
        }
    ]

    return (
        <div
            className={'bg-d-light border-t-[1px] border-t-d-lighter lg:border-r-d-lighter lg:border-r-[1px] px-3 py-3 grid place-items-center lg:place-items-start fixed left-0 bottom-0 w-full lg:w-auto lg:h-screen lg:top-0 lg:bottom-auto'}>
            <div
                className={'max-w-lg flex gap-2 flex-wrap justify-between w-full px-5 lg:px-0 text-2xl items-center lg:grid'}>

                <div className={'relative max-w-[150px] hidden lg:block'}>
                    {/*<Image src={'/logo-full.svg'} width={200} height={120} layout={'responsive'}*/}
                    {/*    alt={'Outlays Dam'} priority/>*/}
                </div>

                <div className={'hidden lg:block text-xs font-bold px-5 text-w-darker py-5'}>
                    Menu główne
                </div>

                {[].slice.call(bottomBarParams).map((param: IBottomBarParam) =>
                    <Link href={param.link} key={param.tab}>
                        <div className={currentSectionsFactory(props.selected, param.tab)}>
                            {param.icon}
                            <div className={'hidden lg:block text-xs'}>{param.name}</div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default BottomBar;

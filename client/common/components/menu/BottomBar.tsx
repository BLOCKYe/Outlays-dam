/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:55
*/

import React from 'react';
import {BiCategory} from "react-icons/bi";
import {MdHistoryEdu, MdQueryStats} from "react-icons/md";
import Paths from "../../router/paths";
import Link from "next/link";

interface IBottomBarProps {
    selected: tabsTypes
}

export type tabsTypes = 'HISTORY' | 'CATEGORIES' | 'STATS'

export interface IBottomBarParam {
    icon: React.ReactNode;
    tab: tabsTypes;
    link: string
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
        const selectedStyles: string = 'box-content p-2 transition-all bg-d-light cursor-pointer rounded-full'
        const defaultStyles: string = 'box-content p-2 transition-all cursor-pointer rounded-full text-w-darker hover:bg-d-light hover:text-w'

        if (selected === local) return selectedStyles
        else return defaultStyles
    }


    /**
     * Menu params
     */

    const bottomBarParams: IBottomBarParam[] = [
        {
            icon: <MdHistoryEdu className={currentSectionsFactory(props.selected, 'HISTORY')} />,
            tab: 'HISTORY',
            link: Paths.HISTORY
        },
        {
            icon: <BiCategory className={currentSectionsFactory(props.selected, 'CATEGORIES')} />,
            tab: 'CATEGORIES',
            link: Paths.CATEGORIES
        },
        {
            icon: <MdQueryStats className={currentSectionsFactory(props.selected, 'STATS')} />,
            tab: 'STATS',
            link: Paths.STATS
        }
    ]

    return (
        <div className={'bg-d border-t-[1px] border-t-d-lighter px-5 py-3 grid place-items-center fixed left-0 bottom-0 w-full'}>
            <div className={'max-w-lg flex gap-2 flex-wrap justify-between w-full px-5 text-2xl items-center'}>
                {[].slice.call(bottomBarParams).map((param: IBottomBarParam) =>
                    <Link href={param.link} key={param.tab}>
                        {param.icon}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default BottomBar;

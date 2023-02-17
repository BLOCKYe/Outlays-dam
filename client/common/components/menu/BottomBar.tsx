/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:55
 */

import React from "react";
import { BiCategory } from "react-icons/bi";
import {
  MdHistoryEdu,
  MdOutlineStarPurple500,
  MdQueryStats,
} from "react-icons/md";
import Paths from "../../router/paths";
import Link from "next/link";

interface IBottomBarProps {
  selected: tabsTypes;
}

export type tabsTypes = "HISTORY" | "CATEGORIES" | "STATS" | "GOALS";

export interface IBottomBarParam {
  icon: React.ReactNode;
  tab: tabsTypes;
  link: string;
  name?: string;
}

const BottomBar: React.FC<IBottomBarProps> = (props) => {
  /**
   * This factory is used to
   * render different styles
   * for current section
   * @param selected
   * @param local
   */

  const currentSectionsFactory = (
    selected: tabsTypes,
    local: tabsTypes
  ): string => {
    const selectedStyles =
      "box-content p-2 lg:p-2 lg:px-10 bg-d-lighter cursor-pointer rounded-full lg:rounded flex items-center gap-3";
    const defaultStyles =
      "box-content p-2 lg:p-2 lg:px-10 cursor-pointer rounded-full lg:rounded text-w-darker hover:bg-d-lighter hover:text-w flex items-center gap-3";

    if (selected === local) return selectedStyles;
    else return defaultStyles;
  };

  /**
   * Menu params
   */

  const bottomBarParams: IBottomBarParam[] = [
    {
      icon: <MdHistoryEdu />,
      tab: "HISTORY",
      link: Paths.HISTORY,
      name: "Wydatki",
    },
    {
      icon: <BiCategory />,
      tab: "CATEGORIES",
      link: Paths.CATEGORIES,
      name: "Kategorie",
    },
    {
      icon: <MdQueryStats />,
      tab: "STATS",
      link: Paths.STATS,
      name: "Statystyki",
    },
    {
      icon: <MdOutlineStarPurple500 />,
      tab: "GOALS",
      link: Paths.GOALS,
      name: "Cele",
    },
  ];

  return (
    <div
      className={
        "fixed left-0 bottom-0 grid w-full place-items-center border-t-[1px] border-t-d-lighter bg-d-light px-3 py-3 lg:top-0 lg:bottom-auto lg:h-screen lg:w-auto lg:place-items-start lg:border-r-[1px] lg:border-r-d-lighter"
      }
    >
      <div
        className={
          "flex w-full max-w-lg flex-wrap items-center justify-between gap-2 px-5 text-2xl lg:grid lg:px-0"
        }
      >
        <div className={"relative hidden max-w-[150px] lg:block"}>
          {/*<Image src={'/logo-full.svg'} width={200} height={120} layout={'responsive'}*/}
          {/*    alt={'Outlays Dam'} priority/>*/}
        </div>

        <div
          className={
            "hidden px-5 py-5 text-xs font-bold text-w-darker lg:block"
          }
        >
          Menu główne
        </div>

        {[].slice.call(bottomBarParams).map((param: IBottomBarParam) => (
          <Link href={param.link} key={param.tab}>
            <div className={currentSectionsFactory(props.selected, param.tab)}>
              {param.icon}
              <div className={"hidden text-xs lg:block"}>{param.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;

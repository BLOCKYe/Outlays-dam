/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12.11.2022
 * Time: 18:04
 */

import React, { Fragment, useMemo } from "react";
import { MdQueryStats } from "react-icons/md";
import { Tooltip } from "@chakra-ui/react";
import type { IColors } from "../../categories/utils/CategoryColors";
import CategoryColors from "../../categories/utils/CategoryColors";

interface IBarChartData {
  label: string;
  value: number;
  color?: IColors;
}

interface IBarChart {
  title: string;
  description?: string;
  data?: IBarChartData[];
}

const BarChartHorizontal: React.FC<IBarChart> = (props) => {
  /**
   * Get max value from data
   * used to calibrate char
   */
  const maxValue = useMemo(() => {
    if (!Array.isArray(props.data)) return 0;
    return Math.max(...props.data?.map((item: IBarChartData) => item.value));
  }, [props.data]);

  return (
    <div className={"rounded-md border-[1px] border-d-lighter bg-d p-5 pb-10"}>
      <div className={"flex items-center gap-2 text-lg font-bold"}>
        <MdQueryStats /> {props.title}
      </div>
      <div className={"mt-3 text-sm text-w-darker"}>
        {props.description ??
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur deserunt explicabo ipsa ipsam minus, modi mollitia placeat sit."}
      </div>

      <div className={"mt-5 grid w-full gap-3"}>
        {Array.isArray(props.data) &&
          props.data.map((item: IBarChartData) => (
            <Fragment key={String(item.label)}>
              <div>
                <p className={"py-2 text-xs font-bold"}>{item.label}</p>

                <div className={"flex w-full items-center gap-3"}>
                  <div
                    className={"h-[20px] rounded bg-c-light hover:opacity-80"}
                    style={{
                      backgroundColor: item.color
                        ? CategoryColors[item.color].default
                        : "#168FFF",
                      width: item.value
                        ? `${(item.value / maxValue) * 100}%`
                        : `1%`,
                    }}
                  />
                  <div className={"text-center text-xs"}>{item.value}</div>
                </div>
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default BarChartHorizontal;

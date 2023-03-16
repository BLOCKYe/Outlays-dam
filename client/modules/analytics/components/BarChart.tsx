/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12.11.2022
 * Time: 18:04
 */

import React, { useMemo } from "react";
import { MdQueryStats } from "react-icons/md";
import { Tooltip } from "@chakra-ui/react";
import type { IBasicAnalyticsMonthData } from "../redux/AnalyticsInterfaces";
import moment from "moment";

interface IBarChartData {
  label: string;
  value: number;
}

interface IBarChart {
  title: string;
  description?: string;
  data?: IBarChartData[];
}

const BarChart: React.FC<IBarChart> = (props) => {
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

      <div className={"mt-14 flex h-[200px] w-full items-end gap-3"}>
        {Array.isArray(props.data) &&
          props.data.map((item: IBarChartData) => (
            <Tooltip
              label={`${item.label} (${item.value} PLN)`}
              placement={"top"}
              key={String(item.label)}
            >
              <div
                className={
                  "relative w-full rounded bg-c-light hover:opacity-80"
                }
                style={{
                  height: item.value
                    ? `${(item.value / maxValue) * 100}%`
                    : `2%`,
                }}
              >
                <div
                  className={
                    "absolute -top-[20px] left-1/2 -translate-x-1/2 transform text-center text-xs"
                  }
                >
                  {item.value}
                </div>
              </div>
            </Tooltip>
          ))}
      </div>
    </div>
  );
};

export default BarChart;

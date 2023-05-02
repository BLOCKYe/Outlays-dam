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

interface IBarChartDataExtended extends IBarChartData {
  secondValue: number;
}

interface IBarChart {
  title: string;
  description?: string;
  data: IBarChartData[];
  secondData: IBarChartData[];
}

const BarChartHorizontal: React.FC<IBarChart> = (props) => {
  /**
   * Get max value from data
   * used to calibrate char
   */
  const maxValue = useMemo(() => {
    if (!Array.isArray(props.data)) return 0;
    if (!Array.isArray(props.secondData)) return 0;
    const maxFirst = Math.max(
      ...props.data?.map((item: IBarChartData) => item.value)
    );
    const maxSecond = Math.max(
      ...props.secondData?.map((item: IBarChartData) => item.value)
    );
    return Math.max(maxFirst, maxSecond);
  }, [props.data, props.secondData]);

  /**
   * Connect incomes and expenses data
   */
  const connectedData = useMemo(() => {
    return props.data
      ?.slice(0, 6)
      .map((dataItem: IBarChartData, idx: number) => {
        return {
          label: dataItem.label,
          value: dataItem.value,
          secondValue: props.secondData[idx]?.value ?? 0,
          color: dataItem.color,
        };
      });
  }, [props.data, props.secondData]);

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
        {Array.isArray(connectedData) &&
          connectedData.map((item: IBarChartDataExtended) => (
            <Fragment key={String(item.label)}>
              <div>
                <p className={"py-2 text-xs font-bold"}>{item.label}</p>

                {/* <--- Render incomes ---> */}
                <div className={"flex w-full items-center gap-3"}>
                  <div
                    className={"h-[20px] rounded bg-c-light hover:opacity-80"}
                    style={{
                      backgroundColor: item.color
                        ? CategoryColors[item.color].default
                        : "#22c55e",
                      width: item.value
                        ? `${(item.value / maxValue) * 100}%`
                        : `1%`,
                    }}
                  />
                  <div className={"text-center text-xs"}>{item.value}</div>
                </div>

                {/* <--- Render expenses ---> */}
                <div className={"mt-1 flex w-full items-center gap-3"}>
                  <div
                    className={"h-[20px] rounded bg-c-light hover:opacity-80"}
                    style={{
                      backgroundColor: item.color
                        ? CategoryColors[item.color].default
                        : "#ef4444",
                      width: item.secondValue
                        ? `${(item.secondValue / maxValue) * 100}%`
                        : `1%`,
                    }}
                  />
                  <div className={"text-center text-xs"}>
                    {item.secondValue}
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default BarChartHorizontal;

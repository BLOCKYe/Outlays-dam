/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12.11.2022
 * Time: 18:04
 */

import React from "react";
import { MdQueryStats } from "react-icons/md";
import { Tooltip } from "@chakra-ui/react";

interface IBarChart {
  title: string;
}

const staticData = [
  {
    title: "Styczeń",
    value: "30%",
  },
  {
    title: "Luty",
    value: "60%",
  },
  {
    title: "Marzec",
    value: "30%",
  },
  {
    title: "Kwiecień",
    value: "15%",
  },
  {
    title: "Maj",
    value: "40%",
  },
  {
    title: "Czerwiec",
    value: "30%",
  },
  {
    title: "Lipiec",
    value: "100%",
  },
  {
    title: "Sierpierń",
    value: "70%",
  },
  {
    title: "Wrzesień",
    value: "50%",
  },
  {
    title: "Październik",
    value: "65%",
  },
  {
    title: "Listopad",
    value: "5%",
  },
  {
    title: "Grudzień",
    value: "0%",
  },
];

const BarChart: React.FC<IBarChart> = (props) => {
  return (
    <div className={"rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      <div className={"flex items-center gap-2 text-lg font-bold"}>
        <MdQueryStats /> {props.title}
      </div>
      <div className={"mt-3 text-sm text-w-darker"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
        deserunt explicabo ipsa ipsam minus, modi mollitia placeat sit.
      </div>

      <div className={"mt-10 flex h-[200px] w-full items-end gap-3"}>
        {[].slice.call(staticData).map((item: any) => (
          <Tooltip label={item?.title} placement={"top"} key={item?.title}>
            <div
              className={
                "w-full rounded bg-c-light transition-all hover:opacity-80"
              }
              style={{ height: item?.value }}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default BarChart;

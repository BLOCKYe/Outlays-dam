/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 12.11.2022
 * Time: 18:18
 */

import React from "react";

interface IStatsCard {
  title: string;
  description?: string;
  value: string | number;
}

const StatsCard: React.FC<IStatsCard> = (props) => {
  return (
    <div className={"rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      <div className={"text-md font-bold"}>{props.title}</div>
      <div className={"mt-3 text-sm text-w-darker"}>
        {props.description ||
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, magni!"}
      </div>
      <div className={"mt-3 text-3xl font-bold"}>{props.value}</div>
    </div>
  );
};

export default StatsCard;

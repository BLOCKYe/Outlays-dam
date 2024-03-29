/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 21/08/2022
 * Time: 02:03
 */

import React from "react";

interface IMainWrapperProps {
  children: React.ReactNode;
  withBg?: boolean;
  variant?: "small" | "default";
}

const MainWrapper: React.FC<IMainWrapperProps> = (props) => (
  <div className={"mb-20 grid place-items-center"}>
    <div
      className={`w-full p-3 ${props.withBg ? "bg-d-light" : ""} ${
        props.variant === "small" ? "max-w-sm" : "lg:pl-[263px]"
      }`}
    >
      {props.children}
    </div>
  </div>
);

export default MainWrapper;

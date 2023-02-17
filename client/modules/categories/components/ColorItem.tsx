/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 21.10.2022
 * Time: 00:33
 */

import React, { useEffect, useRef } from "react";
import { BsCheckLg } from "react-icons/bs";
import autoAnimate from "@formkit/auto-animate";
import type { IColorItemData } from "../../categories/utils/CategoryColors";

interface IColorItem {
  selectedColor: string;
  selectColor: (field: string, value: string) => void;
  data: IColorItemData;
}

const ColorItem: React.FC<IColorItem> = (props) => {
  /**
   * This method is used to
   * render styles
   * for different variants
   * @param color
   */

  return (
    <div
      onClick={() => props.selectColor("color", props.data.name)}
      className={
        "flex w-full cursor-pointer items-center gap-2 rounded py-1 px-3 text-sm font-bold transition-all hover:opacity-100 " +
        props.data.styles +
        " " +
        (props.selectedColor === props.data.name && <BsCheckLg />
          ? "opacity-100"
          : "opacity-50")
      }
    >
      {props.selectedColor === props.data.name && <BsCheckLg />}
      {props.data?.label}
    </div>
  );
};

export default ColorItem;

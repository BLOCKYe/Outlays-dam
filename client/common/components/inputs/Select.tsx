/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 19/08/2022
 * Time: 01:05
 */

import type { ChangeEventHandler } from "react";
import React from "react";

export interface ISelectOption {
  id: string | number;
  name: string;
}

interface ISelectProps {
  placeholder?: string;
  value: string | number;
  name?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  label?: string;
  err?: string;
  options: ISelectOption[];
}

const Select: React.FC<ISelectProps> = (props) => {
  return (
    <div className={"grid w-full gap-2"}>
      {/* <--- Display label ---> */}
      {props.label && (
        <div className={"text-xs text-w-darker"}>{props.label}</div>
      )}

      {/* <--- Input core ---> */}
      <select
        className={
          "custom-calendar w-full cursor-pointer rounded border-[1px] border-d-light bg-d px-5 py-2 text-sm text-w-dark transition-all placeholder:text-sm hover:bg-d-light focus:border-d-lighter focus:outline-none active:outline-none"
        }
        value={props.value || ""}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
      >
        {props.options.map((option: ISelectOption) => (
          <option
            key={option.id}
            value={option.id}
            className={"text-md cursor-pointer"}
          >
            {option.name}
          </option>
        ))}
      </select>

      {/* <--- Display error ---> */}
      {props.err && <div className={"text-sm text-pink-600"}>{props.err}</div>}
    </div>
  );
};

export default Select;

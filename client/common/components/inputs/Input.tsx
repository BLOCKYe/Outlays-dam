/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 19/08/2022
 * Time: 01:05
 */

import React from "react";

interface IInputProps {
  placeholder?: string;
  value?: string | number;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "email" | "password" | "search" | "date";
  label?: string;
  err?: string;
}

const Input: React.FC<IInputProps> = (props) => {
  return (
    <div className={"grid w-full gap-2"}>
      {/* <--- Display label ---> */}
      {props.label && (
        <div className={"text-xs text-w-darker"}>{props.label}</div>
      )}

      {/* <--- Input core ---> */}
      <input
        className={
          "custom-calendar w-full cursor-text rounded border-[1px] border-d-light bg-d px-5 py-2 text-sm text-w-dark placeholder:text-sm hover:bg-d-light focus:border-d-lighter focus:outline-none active:outline-none"
        }
        value={props.value || ""}
        onChange={props.onChange}
        placeholder={props.placeholder}
        type={props.type || "text"}
        name={props.name}
      />

      {/* <--- Display error ---> */}
      {props.err && <div className={"text-sm text-pink-600"}>{props.err}</div>}
    </div>
  );
};

export default Input;

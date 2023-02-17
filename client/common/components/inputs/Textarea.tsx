/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 03.09.2022
 * Time: 20:53
 */

import React, { useEffect, useRef } from "react";

interface ITextareaProps {
  placeholder?: string;
  value?: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  err?: string;
}

const Textarea: React.FC<ITextareaProps> = (props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef !== null && textareaRef.current !== null) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [props.value]);

  return (
    <div className={"grid w-full gap-1"}>
      {/* <--- Display label ---> */}
      {props.label && (
        <div className={"text-xs text-w-darker"}>{props.label}</div>
      )}

      {/* <--- Input core ---> */}
      <textarea
        ref={textareaRef}
        className={
          "resize-none overflow-hidden rounded rounded border-[1px] border-d-light bg-d px-5 py-2 text-sm text-w-dark hover:bg-d-light focus:border-d-lighter focus:outline-none active:outline-none"
        }
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        name={props.name}
      />

      {/* <--- Display error ---> */}
      {props.err && <div className={"text-sm text-pink-600"}>{props.err}</div>}
    </div>
  );
};

export default Textarea;

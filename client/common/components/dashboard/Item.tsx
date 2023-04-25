import React from "react";

interface IItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Item: React.FC<IItemProps> = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={
        "cursor-pointer rounded-md border-[1px] border-d-lighter py-2 px-3 text-sm transition-all hover:bg-d-light " +
        props.className
      }
    >
      {props.children}
    </div>
  );
};

export default Item;

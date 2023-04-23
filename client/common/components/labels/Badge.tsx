import React from "react";

interface IBadgeProps {
  text: string;
}

const Badge: React.FC<IBadgeProps> = (props) => {
  return (
    <div
      className={"rounded-md bg-c py-1 px-2 text-xs font-bold text-c-light "}
    >
      {props.text}
    </div>
  );
};

export default Badge;

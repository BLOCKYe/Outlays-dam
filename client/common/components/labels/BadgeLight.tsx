import React from "react";

interface IBadgeLightProps {
  text: string | number;
}

const BadgeLight: React.FC<IBadgeLightProps> = (props) => {
  return (
    <div
      className={
        "rounded bg-slate-300 py-1 px-3 text-xs font-bold text-slate-700"
      }
    >
      {props.text}
    </div>
  );
};

export default BadgeLight;

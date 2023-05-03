import React from "react";
import Loader from "./Loader";

const LoaderView: React.FC = () => {
  return (
    <div className={"grid min-h-screen w-full place-items-center"}>
      <Loader />
    </div>
  );
};

export default LoaderView;

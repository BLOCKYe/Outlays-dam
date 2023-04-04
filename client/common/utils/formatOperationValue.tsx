import type { IOutlayType } from "../../../common/outlays/OutlaysTypesEnum";
import React from "react";

export const formatOperationValue = (
  type?: IOutlayType,
  value?: number
): string | React.ReactNode => {
  if (!type) return "";
  if (!value) return "";

  switch (type) {
    case "INCOME":
      return <span className={"text-green-600"}>{`+${value}`}</span>;

    case "OUTCOME":
      return <span className={"text-pink-600"}>{`-${value}`}</span>;

    default: {
      return "";
    }
  }
};

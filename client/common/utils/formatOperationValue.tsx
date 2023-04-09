import type { IOperationType } from "../../../common/operations/OperationsTypesEnum";
import React from "react";

export const formatOperationValue = (
  type?: IOperationType,
  value?: number
): string | React.ReactNode => {
  if (!type) return "";
  if (!value) return "";

  switch (type) {
    case "INCOME":
      return <span className={"text-green-500"}>{`+${value}`}</span>;

    case "EXPENSE":
      return <span className={"text-red-500"}>{`-${value}`}</span>;

    default: {
      return "";
    }
  }
};

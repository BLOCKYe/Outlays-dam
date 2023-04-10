/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 19.10.2022
 * Time: 00:03
 */

import React from "react";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useDispatch } from "react-redux";
import type { IGoalData } from "../redux/GoalsInterfaces";
import ProgressBar from "../../../common/components/dashboard/ProgressBar";
import { MdDateRange } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface IGoalItemProps {
  data: IGoalData;
}

const GoalItem: React.FC<IGoalItemProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: any = useDispatch();
  const toast = useToast();

  return (
    <>
      <div
        className={
          "grid cursor-pointer items-center gap-1 bg-d-light py-3 text-sm lg:rounded-md lg:px-3"
        }
      >
        {/* <--- Display title ---> */}
        <div
          className={"text-c-white flex flex-wrap items-center gap-5 font-bold"}
        >
          {props.data.title}
          {props.data.reached && (
            <div
              className={
                "flex items-center gap-1 text-xs font-bold text-green-400"
              }
            >
              <IoMdCheckmarkCircle /> <span>Cel zrealizowany!</span>
            </div>
          )}
        </div>

        {/* <--- Display description ---> */}
        <div className={"text-xs"}>{props.data.description}</div>

        {/* <--- Display date ---> */}
        <div
          className={
            "mt-2 mb-2 flex flex-wrap items-center gap-1 text-xs text-w-darker"
          }
        >
          <MdDateRange /> {props.data?.startDate} - {props.data?.endDate}
        </div>

        {/* <--- Display progress ---> */}
        <ProgressBar
          currentValue={props.data.result ?? 0}
          endValue={props.data.goalValue ?? 1}
        />
      </div>
    </>
  );
};

export default GoalItem;

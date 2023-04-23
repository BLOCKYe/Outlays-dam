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
import type { IGoalData, IGoalRequest } from "../redux/GoalsInterfaces";
import ProgressBar from "../../../common/components/dashboard/ProgressBar";
import { MdDateRange } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import GoalModal from "./GoalModal";
import { setLoading } from "../../../common/redux/UISlice";
import { editGoal, fetchGoals } from "../redux/GoalsRepository";
import type { AppDispatch } from "../../../common/redux/store";
import { GoalsTypesDictionary } from "../../../../common/goals/GoalsTypesEnum";
import Badge from "../../../common/components/labels/Badge";

interface IGoalItemProps {
  data: IGoalData;
}

const GoalItem: React.FC<IGoalItemProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();

  /**
   *
   * @param values
   */
  const submitForm = async (values: IGoalRequest) => {
    try {
      await dispatch(setLoading(true));

      const reqData: IGoalRequest = {
        title: values.title,
        type: values.type,
        description: values.description,
        goalValue: values.goalValue,
        startDate: values.startDate,
        endDate: values.endDate,
      };

      await dispatch(editGoal({ values: reqData, id: props.data.id }));
      await dispatch(fetchGoals());

      displayToast("SUCCESS");

      await dispatch(setLoading(false));
    } catch (e) {
      displayToast("ERROR");
      await dispatch(setLoading(false));
    }

    onClose();
  };

  /**
   * This strategy is used to
   * display different toast by status
   * @param type
   * @param e
   */
  const displayToast = (type: "ERROR" | "SUCCESS", e?: any) => {
    switch (type) {
      case "SUCCESS": {
        toast({
          title: "Dodano nowy cel",
          status: "success",
        });
        break;
      }

      case "ERROR": {
        toast({
          title: e?.message,
          status: "error",
        });
        break;
      }

      default:
        break;
    }
  };

  return (
    <>
      <div
        onClick={onOpen}
        className={
          "grid cursor-pointer items-center gap-1 rounded-md border-[1px] border-d-lighter py-3 px-3 text-sm transition-all hover:bg-d-light"
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
        <div className={"whitespace-pre-wrap text-xs"}>
          {props.data.description}
        </div>

        {/* <--- Display date ---> */}
        <div
          className={
            "mt-2 mb-2 flex flex-wrap items-center gap-1 text-xs font-bold"
          }
        >
          <MdDateRange /> {props.data?.startDate} - {props.data?.endDate}
        </div>

        {/* <--- Display progress ---> */}
        <ProgressBar
          currentValue={props.data.result ?? 0}
          endValue={props.data.goalValue ?? 1}
        />

        <div className={"mt-3 flex"}>
          <Badge text={GoalsTypesDictionary[props.data.type].name} />
        </div>
      </div>

      <GoalModal
        isOpen={isOpen}
        onClose={onClose}
        submitForm={submitForm}
        data={props.data}
      />
    </>
  );
};

export default GoalItem;

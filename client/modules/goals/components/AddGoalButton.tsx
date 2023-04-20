/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:46
 */

import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import GoalModal from "./GoalModal";
import { setLoading } from "../../../common/redux/UISlice";
import type { IGoalRequest } from "../redux/GoalsInterfaces";
import { createGoal, fetchGoals } from "../redux/GoalsRepository";

interface IAddGoalButton {
  text: string;
}

const AddGoalButton: React.FC<IAddGoalButton> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: any = useDispatch();
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
        reached: values.reached,
      };

      await dispatch(createGoal(reqData));
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
      <button
        onClick={onOpen}
        className={
          "flex w-full items-center justify-center gap-3 rounded-md border-[1px] border-d-lighter bg-d px-5 py-3 text-xs font-bold hover:bg-d-light md:w-auto"
        }
      >
        <div>
          <MdOutlineStarPurple500 />
        </div>

        <div>{props.text}</div>
      </button>

      <GoalModal isOpen={isOpen} onClose={onClose} submitForm={submitForm} />
    </>
  );
};

export default AddGoalButton;

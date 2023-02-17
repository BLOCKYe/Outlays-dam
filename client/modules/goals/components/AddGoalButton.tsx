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

interface IAddGoalButton {
  text: string;
}

const AddGoalButton: React.FC<IAddGoalButton> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: any = useDispatch();
  const toast = useToast();

  /**
   * This function is used to
   * create new category
   * @param values
   */

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
    </>
  );
};

export default AddGoalButton;

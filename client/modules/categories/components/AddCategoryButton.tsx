/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:46
 */

import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import type { ICategoryRequest } from "../../categories/redux/CategoriesInterfaces";
import { BiCategory } from "react-icons/bi";
import { setLoading } from "../../../common/redux/UISlice";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { createCategory, fetchCategories } from "../redux/CategoriesRepository";
import CategoryModal from "./CategoryModal";
import type { AppDispatch } from "../../../common/redux/store";

interface IAddCategoryButtonProps {
  text: string;
}

const AddCategoryButton: React.FC<IAddCategoryButtonProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();

  /**
   * This function is used to
   * create new category
   * @param values
   */

  const submitForm = async (values: ICategoryRequest) => {
    try {
      await dispatch(setLoading(true));

      const reqData: ICategoryRequest = {
        name: values.name,
        color: values.color,
      };

      await dispatch(createCategory(reqData));
      await dispatch(fetchCategories());

      toast({
        title: "Dodano nową kategorię",
        status: "success",
      });

      await dispatch(setLoading(false));
    } catch (e: any) {
      toast({
        title: e?.message,
        status: "error",
      });

      await dispatch(setLoading(false));
    }

    onClose();
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
          <BiCategory />
        </div>

        <div>{props.text}</div>
      </button>

      <CategoryModal
        isOpen={isOpen}
        onClose={onClose}
        submitForm={submitForm}
      />
    </>
  );
};

export default AddCategoryButton;

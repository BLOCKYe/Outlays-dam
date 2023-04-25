/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 19.10.2022
 * Time: 00:03
 */

import React from "react";
import type {
  ICategoryData,
  ICategoryRequest,
} from "../redux/CategoriesInterfaces";
import {Tooltip, useToast} from "@chakra-ui/react";
import CategoryColors from "../utils/CategoryColors";
import {useDisclosure} from "@chakra-ui/hooks";
import {useDispatch} from "react-redux";
import CategoryModal from "./CategoryModal";
import {setLoading} from "../../../common/redux/UISlice";
import {
  createCategory,
  editCategory,
  fetchCategories,
} from "../redux/CategoriesRepository";
import type {AppDispatch} from "../../../common/redux/store";

interface ICategoryItemProps {
  data: ICategoryData;
}

const CategoryItem: React.FC<ICategoryItemProps> = (props) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();

  /**
   * This function is used to
   * edit category
   * @param values
   */

  const submitForm = async (values: ICategoryRequest) => {
    try {
      await dispatch(setLoading(true));

      const reqData: ICategoryRequest = {
        name: values.name,
        color: values.color,
      };

      await dispatch(editCategory({values: reqData, id: props.data.id}));
      await dispatch(fetchCategories());

      toast({
        title: `Edytowano kategorie ${props.data.name}`,
        status: "success",
        isClosable: true,
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
        <div
            className={
              "item-cols grid cursor-pointer items-center border-[1px] border-d-lighter py-2 text-sm transition-all hover:bg-d-light rounded-md px-3"
            }
            onClick={onOpen}
        >
          <div
              className={
                  "h-[10px] w-[10px] rounded-lg " +
                  CategoryColors.ColorBuilder(props.data.color, "default", "bg")
              }
          />

          <div className={"text-w"}>{props.data.name}</div>
        </div>

        <CategoryModal
            isOpen={isOpen}
            onClose={onClose}
            submitForm={submitForm}
            data={props.data}
        />
      </>
  );
};

export default CategoryItem;

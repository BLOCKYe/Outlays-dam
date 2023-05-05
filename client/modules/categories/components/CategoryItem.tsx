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
import { Tooltip, useToast } from "@chakra-ui/react";
import CategoryColors from "../utils/CategoryColors";
import { useDisclosure } from "@chakra-ui/hooks";
import { useDispatch } from "react-redux";
import CategoryModal from "./CategoryModal";
import { setLoading } from "../../../common/redux/UISlice";
import {
  createCategory,
  editCategory,
  fetchCategories,
} from "../redux/CategoriesRepository";
import type { AppDispatch } from "../../../common/redux/store";
import Item from "../../../common/components/dashboard/Item";

interface ICategoryItemProps {
  data: ICategoryData;
}

const CategoryItem: React.FC<ICategoryItemProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

      await dispatch(
        editCategory({ values: reqData, id: props.data.id })
      ).unwrap();
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
      <Item onClick={onOpen} className={"item-cols grid items-center "}>
        <div
          className={"h-[10px] w-[10px] rounded-lg "}
          style={{
            backgroundColor: CategoryColors.getColor(props.data.color).default,
          }}
        />

        <div className={"text-w"}>{props.data.name}</div>
      </Item>

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

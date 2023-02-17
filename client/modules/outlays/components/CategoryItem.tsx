/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 05/09/2022
 * Time: 23:38
 */

import React from "react";
import type { ICategoryData } from "../../categories/redux/CategoriesInterfaces";
import { BsCheckLg } from "react-icons/bs";
import CategoryColors from "../../categories/utils/CategoryColors";

interface ICategoryItem {
  selectedCategories?: any;
  selectedCategory: (id: string) => void;
  data: ICategoryData;
}

const CategoryItem: React.FC<ICategoryItem> = (props) => {
  /**
   * This method is used to
   * render styles
   * for different variants
   * @param color
   */

  return (
    <div
      onClick={() => props.selectedCategory(props.data.id)}
      className={
        "flex w-full cursor-pointer items-center gap-2 rounded py-1 px-3 text-sm font-bold hover:opacity-100 " +
        CategoryColors.ColorBuilder(props.data.color, "dark", "bg") +
        " " +
        CategoryColors.ColorBuilder(props.data.color, "default", "text") +
        " " +
        (props.selectedCategories &&
        props.selectedCategories.includes(props.data.id)
          ? "opacity-100"
          : "opacity-50")
      }
    >
      {props.selectedCategories &&
        props.selectedCategories.includes(props.data.id) && <BsCheckLg />}
      {props.data?.name}
    </div>
  );
};

export default CategoryItem;

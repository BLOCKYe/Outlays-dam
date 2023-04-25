/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 18.10.2022
 * Time: 23:21
 */

import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../redux/categoriesSlice";
import { IoList } from "react-icons/io5";
import type { ICategoryData } from "../redux/CategoriesInterfaces";
import CategoryItem from "./CategoryItem";
import { Skeleton } from "@chakra-ui/react";

const CategoriesList = () => {
  const categories = useSelector(selectCategories);

  return (
    <div className={"rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      <div className={"flex items-center gap-2 text-lg font-bold"}>
        <IoList /> Twoje kategorie (
        {Array.isArray(categories) && categories.length})
      </div>
      <div className={"mt-3 text-sm text-w-darker"}>
        <p>Lista wszystkich twoich kategorii.</p>
        <p>
          ✨ W tym miejscu możesz dodać nowe lub edytować istniejące kategorie.
        </p>
      </div>

      {/* <--- Display categories ---> */}
      <div className={"mt-3 grid gap-2"}>
        {categories &&
          categories.map((category: ICategoryData) => (
            <CategoryItem data={category} key={category.id} />
          ))}

        {!categories && (
          <div className={"grid gap-1"}>
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
            <Skeleton startColor="black" endColor="gray" height={"44px"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;

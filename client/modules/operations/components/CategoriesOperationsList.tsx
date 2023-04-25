/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:25
 */

import React from "react";
import { useSelector } from "react-redux";
import { IoList } from "react-icons/io5";
import { Skeleton } from "@chakra-ui/react";
import { selectCategories } from "../../categories/redux/categoriesSlice";
import type { ICategoryData } from "../../categories/redux/CategoriesInterfaces";
import CategoryOperations from "./CategoryOperations";

const CategoriesOperationsList: React.FC = () => {
  const categories = useSelector(selectCategories);

  return (
    <div className={"rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      {/* <--- Header ---> */}
      <div className={"flex items-center justify-between gap-3"}>
        {/* <--- Display history list text ---> */}

        <>
          <div className={"flex items-center gap-2 text-lg font-bold"}>
            <IoList />
            Operacje kategorii
          </div>
        </>
      </div>

      <div className={"mt-3 text-sm text-w-darker"}>
        <p> Lista operacji przypisanych do poszczególnych kategorii.</p>
        <p>
          ✨ W tym miejscu możesz wyświetlić ostatnie operacje przypisane do
          poszczególnych kategorii.
        </p>
      </div>

      {/* <--- Display history ---> */}
      <div className={"mt-5 grid gap-2"}>
        {categories &&
          categories.map((category: ICategoryData) => (
            <CategoryOperations data={category} key={category.id} />
          ))}

        {!categories && (
          <div className={"grid gap-1"}>
            <Skeleton startColor="black" endColor="gray" height={"48px"} />
            <Skeleton startColor="black" endColor="gray" height={"48px"} />
            <Skeleton startColor="black" endColor="gray" height={"48px"} />
            <Skeleton startColor="black" endColor="gray" height={"48px"} />
            <Skeleton startColor="black" endColor="gray" height={"48px"} />
            <Skeleton startColor="black" endColor="gray" height={"48px"} />
            <Skeleton startColor="black" endColor="gray" height={"48px"} />
            <Skeleton startColor="black" endColor="gray" height={"48px"} />
            <Skeleton startColor="black" endColor="gray" height={"48px"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesOperationsList;

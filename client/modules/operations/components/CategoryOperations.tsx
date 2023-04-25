import React, { useState } from "react";
import type { ICategoryData } from "../../categories/redux/CategoriesInterfaces";
import Item from "../../../common/components/dashboard/Item";
import CategoryColors from "../../categories/utils/CategoryColors";
import type { IOperationData } from "../redux/OperationInterfaces";
import OperationItem from "./OperationItem";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import type { AppDispatch } from "../../../common/redux/store";
import { useDispatch } from "react-redux";
import {
  fetchMoreOperations,
  fetchMoreOperationsForCategory,
  fetchOperationsForCategory,
} from "../redux/OperationsRepository";
import Button from "../../../common/components/buttons/Button";

interface ICategoryOperationsProps {
  data: ICategoryData;
}

const CategoryOperations: React.FC<ICategoryOperationsProps> = (props) => {
  const [displayOperations, setDisplayOperations] = useState<boolean>(false);
  const [operations, setOperations] = useState<IOperationData[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState<number>(2);

  /**
   * This function is used to
   * fetch category operations
   */
  const fetchOperations = async () => {
    const operationsResponse = await dispatch(
      fetchOperationsForCategory(props.data.id)
    ).unwrap();

    if (operationsResponse.status === 200)
      setOperations(operationsResponse.data);
  };

  /**
   *
   */
  const handleFetchMoreData = async () => {
    const moreOperationsResponse = await dispatch(
      fetchMoreOperationsForCategory({ page: page, categoryId: props.data.id })
    ).unwrap();
    if (moreOperationsResponse.status === 200) {
      setOperations((prev) => [...prev, ...moreOperationsResponse.data]);
      setPage((curr) => curr + 1);
    }
  };

  /**
   * This function is used to
   * handle show operations
   */
  const handleShowOperations = () => {
    setDisplayOperations((curr) => !curr);
    fetchOperations().then();
  };

  return (
    <>
      <Item className={"cursor-default"}>
        {/* <--- Header ---> */}
        <div
          className={"item-cols-small grid cursor-pointer items-center"}
          onClick={handleShowOperations}
        >
          <div className={"justify-self-start whitespace-nowrap"}>
            <div
              className={
                "flex rounded-xl py-1 px-3 text-xs " +
                CategoryColors.ColorBuilder(props.data.color, "dark", "bg") +
                " " +
                CategoryColors.ColorBuilder(props.data.color, "default", "text")
              }
            >
              {props.data.name}
            </div>
          </div>

          <div className={"justify-self-end"}>
            {displayOperations ? <FiChevronDown /> : <FiChevronRight />}
          </div>
        </div>

        {/* <--- Display operations ---> */}
        {displayOperations && (
          <div className={"mt-5 grid gap-2"}>
            <div className={"text-xs text-w-darker"}>
              Operacje przypisane do kategorii:
            </div>

            {operations &&
              operations.map((operation: IOperationData) => (
                <OperationItem
                  data={operation}
                  key={operation.id}
                  updateData={() => fetchOperations()}
                />
              ))}

            {operations.length === 0 && (
              <div className={"text-xs text-w-dark"}>
                Brak operacji przypisanych do{" "}
                <strong> {props.data.name} </strong>
              </div>
            )}

            <Button
              disabled={
                (Array.isArray(operations) && operations.length % 10 !== 0) ||
                (Array.isArray(operations) && operations.length === 0)
              }
              variant={"CONTAINED"}
              text={"Pokaż więcej"}
              onClick={handleFetchMoreData}
            />
          </div>
        )}
      </Item>
    </>
  );
};

export default CategoryOperations;

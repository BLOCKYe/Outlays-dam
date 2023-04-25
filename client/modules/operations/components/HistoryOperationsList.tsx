/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:25
 */

import React, { useMemo, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { selectOperations } from "../redux/operationsSlice";
import type { IOperationData } from "../redux/OperationInterfaces";
import OperationItem from "./OperationItem";
import { IoClose } from "react-icons/io5";
import Input from "../../../common/components/inputs/Input";
import { useFormik } from "formik";
import { MdHistoryEdu } from "react-icons/md";
import { Skeleton } from "@chakra-ui/react";
import Button from "../../../common/components/buttons/Button";
import { fetchMoreOperations } from "../redux/OperationsRepository";
import type { AppDispatch } from "../../../common/redux/store";

const HistoryOperationsList: React.FC = () => {
  const operations = useSelector(selectOperations);
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState<number>(2);

  // create formik instance
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      keyword: "",
    },
    onSubmit: (values) => console.log(values),
  });

  /**
   * Used to filter by keyword
   */

  const filteredOperations = useMemo(
    () =>
      (operations || []).filter((operation: IOperationData) => {
        return (
          operation.title
            ?.toLowerCase()
            .includes(formik.values.keyword.toLowerCase()) ||
          operation.description
            ?.toLowerCase()
            .includes(formik.values.keyword.toLowerCase()) ||
          String(operation.value)
            .toLowerCase()
            .includes(formik.values.keyword.toLowerCase())
        );
      }),
    [formik.values.keyword, operations]
  );

  /**
   *
   */
  const handleDisplaySearch = () => {
    setDisplaySearch(!displaySearch);
    formik.setFieldValue("keyword", "");
  };

  /**
   *
   */
  const handleFetchMoreData = async () => {
    await dispatch(fetchMoreOperations(page));
    setPage((curr) => curr + 1);
  };

  return (
    <div className={"rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      {/* <--- Header ---> */}
      <div className={"flex items-center justify-between gap-3"}>
        {/* <--- Display history list text ---> */}
        {!displaySearch && (
          <>
            <div className={"flex items-center gap-2 text-lg font-bold"}>
              <MdHistoryEdu /> Ostatnie operacje
            </div>
          </>
        )}

        {/* <--- Display input after click search icon ---> */}
        {displaySearch && (
          <form onSubmit={formik.handleSubmit} className={"w-full"}>
            <Input
              onChange={formik.handleChange}
              name={"keyword"}
              value={formik.values.keyword}
              type={"search"}
              placeholder={"Wyszukaj po tytule, opisie lub wartości..."}
            />
          </form>
        )}

        <div>
          {displaySearch && (
            <IoClose
              onClick={handleDisplaySearch}
              className={
                "box-content cursor-pointer rounded-full p-2 text-xl text-w-dark hover:bg-d-light"
              }
            />
          )}

          {!displaySearch && (
            <IoMdSearch
              onClick={handleDisplaySearch}
              className={
                "box-content cursor-pointer rounded-full p-2 text-xl text-w-dark hover:bg-d-light"
              }
            />
          )}
        </div>
      </div>

      <div className={"mt-3 text-sm text-w-darker"}>
        <p> Lista wszystkich twoich ostatnich operacji.</p>
        <p>
          ✨ Historię wydatków możesz przeszukać po nazwie, opisie lub kwocie.
        </p>
      </div>

      {/* <--- Display history ---> */}
      <div className={"mt-5 grid gap-2"}>
        {operations &&
          filteredOperations.map((operation: IOperationData) => (
            <OperationItem data={operation} key={operation.id} />
          ))}

        <Button
          disabled={
            (Array.isArray(operations) && operations.length % 10 !== 0) ||
            (Array.isArray(operations) && operations.length === 0)
          }
          variant={"CONTAINED"}
          text={"Pokaż więcej"}
          onClick={handleFetchMoreData}
        />

        {!operations && (
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

export default HistoryOperationsList;

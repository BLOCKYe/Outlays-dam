/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:46
 */

import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import type { IOutlayRequest } from "../redux/OutlaysInterfaces";
import { useDispatch } from "react-redux";
import { createOutlay, fetchOutlays } from "../redux/OutlaysRepository";
import { useToast } from "@chakra-ui/react";
import { setLoading } from "../../../common/redux/UISlice";
import { fetchLastSpending } from "../../analytics/redux/AnalyticsRepository";
import { FaMoneyBillWave } from "react-icons/fa";
import OutlayModal from "./OutlayModal";
import { OutlaysTypesEnum } from "../../../../common/outlays/OutlaysTypesEnum";

interface IAddButtonProps {
  text: string;
}

const AddOutlayButton: React.FC<IAddButtonProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: any = useDispatch();
  const toast = useToast();

  /**
   * This function is used to
   * create new outlay
   * @param values
   */
  const submitForm = async (values: IOutlayRequest) => {
    try {
      await dispatch(setLoading(true));
      const parsedSelectedCategories: { id: string }[] = [];

      if (values.categories) {
        for (const category of values.categories) {
          parsedSelectedCategories.push({ id: category });
        }
      }

      const reqData: IOutlayRequest = {
        title: values.title,
        type: OutlaysTypesEnum.OUTCOME,
        description: values.description,
        value: values.value,
        date: values.date,
        categories: parsedSelectedCategories,
      };

      await dispatch(createOutlay(reqData));

      const promises = [
        dispatch(fetchOutlays()),
        dispatch(fetchLastSpending({ date: new Date() })),
      ];

      await Promise.all(promises);

      displayToast("SUCCESS");

      await dispatch(setLoading(false));
    } catch (e: any) {
      displayToast("ERROR", e);

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
          title: "Dodano nową operację",
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
          "flex h-full w-full items-center justify-center gap-3 rounded border-[1px] border-d-lighter bg-d px-5 py-3 text-xs font-bold hover:bg-d-light md:w-auto"
        }
      >
        <div>
          <FaMoneyBillWave />
        </div>

        <div>{props.text}</div>
      </button>

      <OutlayModal isOpen={isOpen} onClose={onClose} submitForm={submitForm} />
    </>
  );
};

export default AddOutlayButton;

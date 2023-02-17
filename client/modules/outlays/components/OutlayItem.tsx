/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:48
 */

import React, { useEffect, useRef, useState } from "react";
import type { IOutlayData, IOutlayRequest } from "../redux/OutlaysInterfaces";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import Button from "../../../common/components/buttons/Button";
import moment from "moment/moment";
import type { ICategoryData } from "../../categories/redux/CategoriesInterfaces";
import { Divider, Tooltip, useToast } from "@chakra-ui/react";
import CategoryColors from "../../categories/utils/CategoryColors";
import OutlayModal from "./OutlayModal";
import { setLoading } from "../../../common/redux/UISlice";
import {
  createOutlay,
  editOutlay,
  fetchOutlays,
} from "../redux/OutlaysRepository";
import { fetchLastSpending } from "../../analytics/redux/AnalyticsRepository";
import { useDispatch } from "react-redux";
import OutlayPreviewModal from "./OutlayPreviewModal";

interface OutlayItemProps {
  data: IOutlayData;
}

const OutlayItem: React.FC<OutlayItemProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderedModal, setRenderedModal] = useState<"PREVIEW" | "EDIT">(
    "PREVIEW"
  );
  const dispatch: any = useDispatch();
  const toast = useToast();

  const submitForm = async (values: IOutlayRequest) => {
    try {
      await dispatch(setLoading(true));
      if (!props.data.id) return;

      const parsedSelectedCategories: { id: string }[] = [];

      if (values.categories) {
        for (const category of values.categories) {
          parsedSelectedCategories.push({ id: category });
        }
      }

      const reqData: IOutlayRequest = {
        title: values.title,
        description: values.description,
        value: values.value,
        date: values.date,
        categories: parsedSelectedCategories,
      };

      await dispatch(editOutlay({ values: reqData, id: props.data.id }));
      await dispatch(fetchOutlays());
      await dispatch(fetchLastSpending());

      toast({
        title: `Edytowano wydatek: ${props.data.title}`,
        status: "success",
        isClosable: true,
      });

      await dispatch(setLoading(false));
      setRenderedModal("PREVIEW");
    } catch (e: any) {
      toast({
        title: e?.message,
        status: "error",
      });

      await dispatch(setLoading(false));
    }
  };

  /**
   * This strategy is used to
   * render modal by type
   */

  const renderModalType = (): any => {
    switch (renderedModal) {
      case "PREVIEW":
        return (
          <OutlayPreviewModal
            isOpen={isOpen}
            setEdit={() => setRenderedModal("EDIT")}
            onClose={onClose}
            data={props.data}
          />
        );

      case "EDIT":
        return (
          <OutlayModal
            isOpen={isOpen}
            setPreview={() => setRenderedModal("PREVIEW")}
            onClose={onClose}
            submitForm={submitForm}
            data={props.data}
          />
        );

      default:
        return (
          <OutlayPreviewModal
            isOpen={isOpen}
            setEdit={() => setRenderedModal("EDIT")}
            onClose={onClose}
            data={props.data}
          />
        );
    }
  };

  return (
    <>
      <div
        onClick={onOpen}
        className={
          "cursor-pointer py-3 transition-all hover:bg-d-light lg:rounded-md lg:px-3"
        }
      >
        <div className={"item-cols grid place-items-center"}>
          <div className={"grid grid-cols-2 gap-1 justify-self-start"}>
            {[].slice
              .call(props.data.categories)
              .map((category: ICategoryData) => (
                <div key={category.id}>
                  <Tooltip label={category.name}>
                    <div
                      className={
                        "h-[10px] w-[10px] rounded-lg " +
                        CategoryColors.ColorBuilder(
                          category.color,
                          "default",
                          "bg"
                        )
                      }
                    />
                  </Tooltip>
                </div>
              ))}

            {/* <--- Display default ---> */}
            {props.data.categories.length === 0 && (
              <div className={"h-[10px] w-[10px] rounded-lg text-d-lighter"} />
            )}
          </div>

          <div className={"justify-self-start text-sm"}>{props.data.title}</div>

          <div className={"hidden justify-self-start lg:block"}>
            {[].slice
              .call(props.data.categories)
              .map((category: ICategoryData) => (
                <div key={category.id}>
                  <div
                    className={
                      "rounded-xl py-1 px-3 text-xs " +
                      CategoryColors.ColorBuilder(
                        category.color,
                        "dark",
                        "bg"
                      ) +
                      " " +
                      CategoryColors.ColorBuilder(
                        category.color,
                        "default",
                        "text"
                      )
                    }
                  >
                    {category.name}
                  </div>
                </div>
              ))}

            {/* <--- Display default ---> */}
            {props.data.categories.length === 0 && (
              <div className={"h-[10px] w-[10px] rounded-lg text-d-lighter"} />
            )}
          </div>

          <div className={"justify-self-end text-sm text-w"}>
            -{props.data.value}{" "}
            <span className={"text-sm font-normal text-w-darker"}>PLN</span>
          </div>
        </div>
      </div>

      {renderModalType()}
    </>
  );
};

export default OutlayItem;

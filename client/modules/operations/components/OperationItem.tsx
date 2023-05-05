/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:48
 */

import React, { useState } from "react";
import type {
  IOperationData,
  IOperationRequest,
} from "../redux/OperationInterfaces";
import { useDisclosure } from "@chakra-ui/hooks";
import type { ICategoryData } from "../../categories/redux/CategoriesInterfaces";
import { Tooltip, useToast } from "@chakra-ui/react";
import CategoryColors from "../../categories/utils/CategoryColors";
import OperationModal from "./OperationModal";
import { setLoading } from "../../../common/redux/UISlice";
import { editOperation, fetchOperations } from "../redux/OperationsRepository";
import { fetchLastSpending } from "../../analytics/redux/AnalyticsRepository";
import { useDispatch } from "react-redux";
import OperationPreviewModal from "./OperationPreviewModal";
import { formatOperationValue } from "../../../common/utils/formatOperationValue";
import type { AppDispatch } from "../../../common/redux/store";
import Item from "../../../common/components/dashboard/Item";

interface OperationItemProps {
  data: IOperationData;
  updateData?: () => Promise<void>;
}

type modalStates = "PREVIEW" | "EDIT";

const OperationItem: React.FC<OperationItemProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [renderedModal, setRenderedModal] = useState<modalStates>("PREVIEW");
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();

  /**
   *
   * @param values
   */
  const submitForm = async (values: IOperationRequest) => {
    try {
      await dispatch(setLoading(true));
      if (!props.data.id) return;

      const parsedSelectedCategories: { id: string }[] = [];

      if (values.categories) {
        for (const category of values.categories) {
          parsedSelectedCategories.push({ id: category });
        }
      }

      const reqData: IOperationRequest = {
        title: values.title,
        description: values.description,
        value: values.value,
        type: values.type,
        date: values.date,
        categories: parsedSelectedCategories,
      };

      await dispatch(
        editOperation({ values: reqData, id: props.data.id })
      ).unwrap();
      displayToast("SUCCESS");
      await updateData();

      await dispatch(setLoading(false));
      setRenderedModal("PREVIEW");
    } catch (e: any) {
      displayToast("ERROR", e);
      await dispatch(setLoading(false));
    }
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
          title: `Edytowano operacje: ${props.data.title}`,
          status: "success",
          isClosable: true,
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

  /**
   *
   */
  const updateData = async () => {
    const promises = [
      dispatch(fetchOperations()),
      dispatch(fetchLastSpending({ date: new Date() })),
    ];
    await Promise.all(promises);
  };

  /**
   * This strategy is used to
   * render modal by type
   */
  const renderModalType = (): React.ReactNode => {
    switch (renderedModal) {
      case "PREVIEW":
        return (
          <OperationPreviewModal
            isOpen={isOpen}
            setEdit={() => setRenderedModal("EDIT")}
            onClose={onClose}
            data={props.data}
          />
        );

      case "EDIT":
        return (
          <OperationModal
            isOpen={isOpen}
            setPreview={() => setRenderedModal("PREVIEW")}
            onClose={onClose}
            submitForm={submitForm}
            data={props.data}
            updateData={() => props.updateData && props.updateData()}
          />
        );

      default:
        return (
          <OperationPreviewModal
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
      <Item onClick={onOpen}>
        <div className={"item-cols grid place-items-center"}>
          <div className={"grid grid-cols-2 gap-1 justify-self-start"}>
            {props.data.categories.map((category: ICategoryData) => (
              <div key={category.id}>
                <Tooltip label={category.name}>
                  <div
                    className={"h-[10px] w-[10px] rounded-lg "}
                    style={{
                      backgroundColor: CategoryColors.getColor(category.color)
                        .default,
                    }}
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

          <div
            className={"hidden justify-self-start whitespace-nowrap lg:block"}
          >
            {props.data.categories.map((category: ICategoryData) => (
              <div key={category.id}>
                <div
                  className={"rounded-xl py-1 px-3 text-xs "}
                  style={{
                    backgroundColor: CategoryColors.getColor(category.color)
                      .dark,
                    color: CategoryColors.getColor(category.color).default,
                  }}
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
            <span className={"text-sm font-bold"}>
              {formatOperationValue(props.data.type, props.data.value)}{" "}
            </span>
            <span className={"text-xs font-normal text-w-dark"}>PLN</span>
          </div>
        </div>
      </Item>

      {renderModalType()}
    </>
  );
};

export default OperationItem;

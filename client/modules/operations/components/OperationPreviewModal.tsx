/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 01.11.2022
 * Time: 12:36
 */

import React from "react";
import type { IOperationData } from "../redux/OperationInterfaces";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import moment from "moment";
import type { ICategoryData } from "../../categories/redux/CategoriesInterfaces";
import Button from "../../../common/components/buttons/Button";
import CategoryColors from "../../categories/utils/CategoryColors";

interface IOperationPreviewModal {
  isOpen: boolean;
  onClose: () => void;
  data?: IOperationData;
  setEdit: () => void;
}

const OperationPreviewModal: React.FC<IOperationPreviewModal> = (props) => {
  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className={"bg-d"}>{props.data?.title}</ModalHeader>
        <ModalCloseButton />

        {/* <--- Form ---> */}
        <ModalBody className={"bg-d"}>
          <div className={"text-w-dark"}>
            {moment(props.data?.date).format("DD MMMM YYYY")}
          </div>

          <div className={"mt-3 whitespace-pre-wrap text-w-darker"}>
            {props.data?.description}
          </div>

          <div className={"mt-5 text-sm"}>Kategorie:</div>

          <div className={"mt-1 text-w-dark"}>
            {props.data?.categories.map((category: ICategoryData) => (
              <div key={category.id} className={"flex items-center gap-3"}>
                <div
                  className={
                    "h-[10px] w-[10px] rounded-lg " +
                    CategoryColors.ColorBuilder(category.color, "default", "bg")
                  }
                />
                {category.name}
              </div>
            ))}
          </div>

          <ModalFooter className={"flex gap-3"}>
            <Button
              variant={"CONTAINED"}
              text={"Zamknij"}
              onClick={props.onClose}
            />
            <Button
              variant={"OUTLINED"}
              text={"Edytuj"}
              onClick={props.setEdit}
            />
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OperationPreviewModal;

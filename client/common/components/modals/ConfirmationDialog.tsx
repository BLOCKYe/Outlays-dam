import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import Button from "../buttons/Button";

interface IConfirmationDialogProps {
  title: string;
  description?: string;
  onConfirm: () => Promise<void>;
  children: React.ReactNode;
  confirmText?: string;
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = React.useRef();

  /**
   *
   */
  const handleConfirmAction = async () => {
    try {
      onClose();
      await props.onConfirm();
    } catch (e) {
      onClose();
    }
  };

  return (
    <>
      <div onClick={onOpen}>{props.children}</div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className={"!bg-d"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.title}
            </AlertDialogHeader>

            <AlertDialogBody>{props.description}</AlertDialogBody>

            <AlertDialogFooter>
              <div className={"flex flex-wrap gap-2"}>
                <Button
                  text={"Anuluj"}
                  variant={"OUTLINED"}
                  onClick={onClose}
                />
                <Button
                  variant={"CONTAINED"}
                  onClick={() => handleConfirmAction()}
                  text={props?.confirmText ?? "Tak"}
                />
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmationDialog;

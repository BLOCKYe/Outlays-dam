/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 22.10.2022
 * Time: 11:54
 */

import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import Input from "../../../common/components/inputs/Input";
import type { IColorItemData } from "../utils/CategoryColors";
import CategoryColors from "../utils/CategoryColors";
import ColorItem from "./ColorItem";
import Button from "../../../common/components/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { categorySchema, initialValues } from "../utils/CategoryFormik";
import type { ICategoryData } from "../redux/CategoriesInterfaces";
import { ICategoryRequest } from "../redux/CategoriesInterfaces";
import { selectLoading, setLoading } from "../../../common/redux/UISlice";
import {
  createCategory,
  deleteCategory,
  editCategory,
  fetchCategories,
} from "../redux/CategoriesRepository";
import ConfirmationDialog from "../../../common/components/modals/ConfirmationDialog";
import type { AppDispatch } from "../../../common/redux/store";

interface ICategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitForm: (values: any) => void;
  data?: ICategoryData;
}

const CategoryModal: React.FC<ICategoryModalProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const loading = useSelector(selectLoading);

  // create formik instance
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues: {
      name: props.data?.name || "",
      color: props.data?.color || "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values, { resetForm }) => {
      await props.submitForm(values);
      resetForm();
    },
  });

  /**
   *
   * @param id
   */

  const removeCategory = async (id?: string): Promise<void> => {
    if (!id) return;

    try {
      await dispatch(setLoading(true));

      await dispatch(deleteCategory(id));
      await dispatch(fetchCategories());

      toast({
        title: `Usunięto kategorie: ${props?.data?.name}`,
        status: "info",
        isClosable: true,
      });

      await dispatch(setLoading(false));
    } catch (e: any) {
      toast({
        title: e?.message,
        status: "error",
      });

      await dispatch(setLoading(false));
    }
  };

  /**
   *
   */
  const disabledButtonController = useMemo(() => {
    if (!formik.dirty) return true;
    if (!formik.values.name) return true;
    if (!formik.values.color) return true;
    if (loading) return true;

    return false;
  }, [formik.dirty, formik.values.color, formik.values.name, loading]);

  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className={"bg-d"}>
          {props.data?.id ? "Edytuj kategorie" : "Dodaj nową kategorię"}
        </ModalHeader>
        <ModalCloseButton />

        {/* <--- Form ---> */}
        <ModalBody className={"bg-d"}>
          <div className={"text-w-darker"}>
            Aby utworzyć nowa kategorię wypełnij formularz. Wprowadź nazwę i
            wybierz kolor.
          </div>

          <form className={"mt-3 grid gap-5"} onSubmit={formik.handleSubmit}>
            <Input
              onChange={formik.handleChange}
              value={formik.values.name}
              name={"name"}
              err={formik.errors.name}
              type={"text"}
              label={"Nazwa kategorii"}
              placeholder={"Nazwa kategorii"}
            />

            {/* <--- Color ---> */}
            <div>
              <div className={"text-sm text-w-darker"}>Wybierz kolor</div>

              <div className={"mt-2 flex flex-wrap items-center gap-2"}>
                {[].slice
                  .call(CategoryColors.availableColors)
                  .map((color: IColorItemData) => (
                    <ColorItem
                      selectedColor={formik.values.color}
                      key={color.name}
                      selectColor={() =>
                        formik.setFieldValue("color", color.name)
                      }
                      data={color}
                    />
                  ))}
              </div>
            </div>

            <ModalFooter className={"flex flex-wrap gap-3"}>
              {/* <--- Delete goal confirmation ---> */}
              {props.data?.id && (
                <ConfirmationDialog
                  title={"Czy na pewno chcesz usunąć tą kategorię?"}
                  description={"Wykonanej operacji nie będzie dało się cofnąć!"}
                  onConfirm={() => removeCategory(props.data?.id)}
                >
                  <Button variant={"OUTLINED"} text={"Usuń"} />
                </ConfirmationDialog>
              )}
              <Button
                variant={"OUTLINED"}
                text={"Anuluj"}
                onClick={props.onClose}
              />
              <Button
                variant={"CONTAINED"}
                text={"Zapisz"}
                type={"submit"}
                disabled={disabledButtonController}
              />
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;

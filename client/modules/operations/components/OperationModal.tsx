/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 22.10.2022
 * Time: 23:27
 */

import React, { useMemo } from "react";
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
import Input from "../../../common/components/inputs/Input";
import Textarea from "../../../common/components/inputs/Textarea";
import type { ICategoryData } from "../../categories/redux/CategoriesInterfaces";
import CategoryItem from "./CategoryItem";
import Button from "../../../common/components/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../categories/redux/categoriesSlice";
import { useFormik } from "formik";
import { operationSchema } from "../utils/OperationFormik";
import moment from "moment/moment";
import { selectLoading, setLoading } from "../../../common/redux/UISlice";
import { useToast } from "@chakra-ui/react";
import {
  deleteOperation,
  fetchOperations,
} from "../redux/OperationsRepository";
import { fetchLastSpending } from "../../analytics/redux/AnalyticsRepository";
import { OperationsTypesEnum } from "../../../../common/operations/OperationsTypesEnum";
import { fetchGoals } from "../../goals/redux/GoalsRepository";
import ConfirmationDialog from "../../../common/components/modals/ConfirmationDialog";
import type { AppDispatch } from "../../../common/redux/store";

interface IOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitForm: (values: any) => void;
  data?: IOperationData;
  setPreview?: () => void;
  updateData?: () => any;
}

const OperationModal: React.FC<IOperationModalProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);

  // create formik instance
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues: {
      date: props.data?.date || moment(new Date()).format("yyyy-MM-DD"),
      title: props.data?.title || "",
      description: props.data?.description || "",
      type: props.data?.type || OperationsTypesEnum.EXPENSE,
      value: props.data?.value || 0,
      categories:
        props.data?.categories && props.data?.categories.length > 0
          ? [props.data?.categories[0]?.id]
          : [] || [],
    },
    validationSchema: operationSchema,
    onSubmit: async (values, { resetForm }) => {
      await props.submitForm(values);
      props.setPreview && props.setPreview();
      props.updateData && props.updateData();
      resetForm();
    },
  });

  /**
   *
   * @param id
   */
  const removeOperation = async (id?: string): Promise<void> => {
    if (!id) return;

    try {
      await dispatch(setLoading(true));

      await dispatch(deleteOperation(id));

      const promises = [
        dispatch(fetchOperations()),
        dispatch(fetchGoals()),
        dispatch(fetchLastSpending({ date: new Date() })),
      ];

      await Promise.all(promises);

      toast({
        title: `Usunięto operację: ${props?.data?.title}`,
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
    if (!formik.values.title) return true;
    if (!formik.values.value) return true;
    if (!formik.values.date) return true;
    if (loading) return true;

    return false;
  }, [
    formik.dirty,
    formik.values.date,
    formik.values.title,
    formik.values.value,
    loading,
  ]);

  return (
    <Modal
      onClose={() => {
        props.onClose();
        props.setPreview && props.setPreview();
      }}
      isOpen={props.isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className={"bg-d"}>
          {props.data?.id ? "Edytuj operację" : "Dodaj nową operację"}
        </ModalHeader>
        <ModalCloseButton />

        {/* <--- Form ---> */}
        <ModalBody className={"bg-d"}>
          <div className={"text-w-darker"}>
            Aby utworzyć nową operację wypełnij formularz. Wprowadź tytuł, kwotę
            oraz datę.
          </div>

          <form className={"mt-3 grid gap-5"} onSubmit={formik.handleSubmit}>
            {/* <--- Type ---> */}
            <div className={"grid gap-3 md:grid-cols-2"}>
              <Button
                onClick={() =>
                  formik.setFieldValue("type", OperationsTypesEnum.EXPENSE)
                }
                variant={
                  formik.values.type === OperationsTypesEnum.EXPENSE
                    ? "CONTAINED"
                    : "OUTLINED"
                }
                text={"WYDATEK"}
              />
              <Button
                onClick={() =>
                  formik.setFieldValue("type", OperationsTypesEnum.INCOME)
                }
                variant={
                  formik.values.type === OperationsTypesEnum.INCOME
                    ? "CONTAINED"
                    : "OUTLINED"
                }
                text={"PRZYCHÓD"}
              />
            </div>

            <Input
              onChange={formik.handleChange}
              value={formik.values.title}
              name={"title"}
              err={formik.errors.title}
              type={"text"}
              label={"Tytuł"}
              placeholder={"Tytuł"}
            />

            <Textarea
              onChange={formik.handleChange}
              value={formik.values.description}
              name={"description"}
              label={"Opis"}
              placeholder={"Opis"}
              err={formik.errors.description}
            />

            <Input
              onChange={formik.handleChange}
              value={formik.values.value}
              name={"value"}
              type={"number"}
              label={"Kwota w PLN"}
              placeholder={"Kwota w PLN"}
              err={formik.errors.value}
            />

            <Input
              onChange={formik.handleChange}
              value={formik.values.date}
              name={"date"}
              type={"date"}
              label={"Data operacji"}
              placeholder={"Data operacji"}
              err={formik.errors.date}
            />

            {/* <--- Categories ---> */}
            <div>
              <div className={"text-xs text-w-darker"}>Wybierz kategorie</div>

              <div className={"mt-3 flex flex-wrap items-center gap-2"}>
                {categories &&
                  categories.map((category: ICategoryData) => (
                    <CategoryItem
                      selectedCategories={formik.values.categories}
                      key={category.id}
                      selectedCategory={() =>
                        formik.setFieldValue("categories", [category.id])
                      }
                      data={category}
                    />
                  ))}
              </div>

              {categories && categories.length === 0 && (
                <div className={"mt-1 text-sm text-pink-600"}>
                  Zanim utworzysz operację, stwórz nową kategorię.
                </div>
              )}
            </div>

            <ModalFooter className={"flex flex-wrap gap-3"}>
              {/* <--- Delete goal confirmation ---> */}
              {props.data?.id && (
                <ConfirmationDialog
                  title={"Czy na pewno chcesz usunąć tą operację?"}
                  description={"Wykonanej operacji nie będzie dało się cofnąć!"}
                  onConfirm={() => removeOperation(props.data?.id)}
                >
                  <Button variant={"OUTLINED"} text={"Usuń"} />
                </ConfirmationDialog>
              )}

              <Button
                variant={"OUTLINED"}
                text={"Anuluj"}
                onClick={() => {
                  props.onClose();
                  props.setPreview && props.setPreview();
                }}
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

export default OperationModal;

/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 22.10.2022
 * Time: 23:27
 */

import React, { useState } from "react";
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
import Button from "../../../common/components/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment/moment";
import { selectLoading, setLoading } from "../../../common/redux/UISlice";
import { useToast } from "@chakra-ui/react";
import type { IGoalData } from "../redux/GoalsInterfaces";
import { GoalsTypesEnum } from "../../../../common/goals/GoalsTypesEnum";
import { goalSchema } from "../utils/GoalFormik";
import { deleteGoal, fetchGoals } from "../redux/GoalsRepository";

interface IGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitForm: (values: any) => void;
  data?: IGoalData;
  setPreview?: () => void;
}

const GoalModal: React.FC<IGoalModalProps> = (props) => {
  const dispatch: any = useDispatch();
  const toast = useToast();
  const [submitRemove, setSubmitRemove] = useState<boolean>(false);
  const loading = useSelector(selectLoading);

  // create formik instance
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    initialValues: {
      startDate:
        props.data?.startDate || moment(new Date()).format("yyyy-MM-DD"),
      endDate: props.data?.endDate || moment(new Date()).format("yyyy-MM-DD"),
      title: props.data?.title || "",
      description: props.data?.description || "",
      type: props.data?.type || GoalsTypesEnum.EXPENSE,
      goalValue: props.data?.goalValue || 0,
      reached: false,
    },
    validationSchema: goalSchema,
    onSubmit: async (values, { resetForm }) => {
      await props.submitForm(values);
      props.setPreview && props.setPreview();
      resetForm();
    },
  });

  /**
   *
   * @param id
   */
  const removeGoal = async (id?: string): Promise<void> => {
    if (!id) return;

    setSubmitRemove(true);
    if (!submitRemove) return;

    try {
      await dispatch(setLoading(true));

      await dispatch(deleteGoal(id));

      const promises = [dispatch(fetchGoals())];

      await Promise.all(promises);

      toast({
        title: `Usunięto cel: ${props?.data?.title}`,
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
          {props.data?.id ? "Edytuj cel" : "Dodaj nowy cel"}
        </ModalHeader>
        <ModalCloseButton />

        {/* <--- Form ---> */}
        <ModalBody className={"bg-d"}>
          <div className={"text-w-darker"}>
            W tym miejscu możesz utworzyć nowy cel. <br />
            Wybierz zakres dat oraz wprowadź wartość.
          </div>

          <form className={"mt-3 grid gap-5"} onSubmit={formik.handleSubmit}>
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
              value={formik.values.goalValue}
              name={"goalValue"}
              type={"number"}
              label={"Kwota w PLN"}
              placeholder={"Kwota w PLN"}
              err={formik.errors.goalValue}
            />

            <Input
              onChange={formik.handleChange}
              value={formik.values.startDate}
              name={"startDate"}
              type={"date"}
              label={"Data rozpoczęcia celu"}
              placeholder={"Data rozpoczęcia celu"}
              err={formik.errors.startDate}
            />

            <Input
              onChange={formik.handleChange}
              value={formik.values.endDate}
              name={"endDate"}
              type={"date"}
              label={"Data zakończenia celu"}
              placeholder={"Data zakończenia celu"}
              err={formik.errors.endDate}
            />

            <ModalFooter className={"flex gap-3"}>
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
                disabled={!formik.dirty || loading}
              />
            </ModalFooter>

            {/* <--- Delete goal confirmation ---> */}
            <>
              {submitRemove && (
                <div className={"mt-1 text-sm text-pink-600"}>
                  Czy na pewno chcesz usunąć tą operację?
                </div>
              )}

              {props.data?.id && (
                <Button
                  variant={"OUTLINED"}
                  disabled={loading}
                  text={submitRemove ? "Tak, usuń!" : "Usuń cel"}
                  onClick={() => removeGoal(props.data?.id)}
                />
              )}
            </>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GoalModal;

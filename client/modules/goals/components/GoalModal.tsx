/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 22.10.2022
 * Time: 23:27
 */

import React, { useMemo } from "react";
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
import {
  GoalsTypesDictionary,
  GoalsTypesEnum,
  GoalsTypesKeys,
} from "../../../../common/goals/GoalsTypesEnum";
import { goalSchema } from "../utils/GoalFormik";
import { deleteGoal, fetchGoals, setAsReached } from "../redux/GoalsRepository";
import ConfirmationDialog from "../../../common/components/modals/ConfirmationDialog";
import { IoMdCheckmarkCircle } from "react-icons/io";
import type { AppDispatch } from "../../../common/redux/store";

interface IGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitForm: (values: any) => void;
  data?: IGoalData;
  setPreview?: () => void;
}

const GoalModal: React.FC<IGoalModalProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const toast = useToast();
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

  /**
   *
   * @param id
   */
  const reachGoal = async (id?: string): Promise<void> => {
    if (!id) return;

    try {
      await dispatch(setLoading(true));

      await dispatch(setAsReached(id));

      const promises = [dispatch(fetchGoals())];

      await Promise.all(promises);

      toast({
        title: `Oznaczyłeś cel jako wypełniony: ${props?.data?.title}`,
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
   * This function is used to
   * handle change start date
   *
   * End date must not be before the start
   */
  const handleChangeStartDate = (value: string) => {
    const endDate = formik.values.endDate;
    if (moment(endDate).isBefore(value)) {
      formik.setFieldValue("endDate", value);
    }

    formik.setFieldValue("startDate", value);
  };

  /**
   * This function is used to
   * handle change end date
   *
   * End date must not be before the start
   */
  const handleChangeEndDate = (value: string) => {
    let date = value;
    const startDate = formik.values.startDate;
    if (moment(startDate).isAfter(date)) {
      date = startDate;
    }

    formik.setFieldValue("endDate", date);
  };

  /**
   *
   */
  const disabledButtonController = useMemo(() => {
    if (!formik.dirty) return true;
    if (!formik.values.title) return true;
    if (!formik.values.goalValue) return true;
    if (!formik.values.startDate) return true;
    if (!formik.values.endDate) return true;
    if (loading) return true;

    return false;
  }, [
    formik.dirty,
    formik.values.startDate,
    formik.values.endDate,
    formik.values.title,
    formik.values.goalValue,
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
            {/* <--- Type ---> */}
            <div className={"text-xs text-w-darker"}>Wybierz rodzaj celu</div>

            <div className={"grid gap-1"}>
              {GoalsTypesKeys.map((goalType) => (
                <Button
                  key={goalType}
                  onClick={() => formik.setFieldValue("type", goalType)}
                  variant={
                    formik.values.type === goalType ? "CONTAINED" : "OUTLINED"
                  }
                  text={GoalsTypesDictionary[goalType].name}
                />
              ))}
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
              value={formik.values.goalValue}
              name={"goalValue"}
              type={"number"}
              label={"Kwota w PLN"}
              placeholder={"Kwota w PLN"}
              err={formik.errors.goalValue}
            />

            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeStartDate(e.target.value)
              }
              value={formik.values.startDate}
              name={"startDate"}
              type={"date"}
              label={"Data rozpoczęcia celu"}
              placeholder={"Data rozpoczęcia celu"}
              err={formik.errors.startDate}
            />

            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeEndDate(e.target.value)
              }
              value={formik.values.endDate}
              name={"endDate"}
              type={"date"}
              label={"Data zakończenia celu"}
              placeholder={"Data zakończenia celu"}
              err={formik.errors.endDate}
            />

            {/* <--- Set as reached ---> */}
            {props.data?.id && !props.data.reached && (
              <ConfirmationDialog
                title={"Czy chcesz zaznaczyć cel jako ukończony?"}
                description={
                  "Potwierdzając ukończenie celu dodasz go do swoich statystyk."
                }
                onConfirm={() => reachGoal(props.data?.id)}
              >
                <div className={"grid w-full"}>
                  <Button
                    variant={"OUTLINED"}
                    text={"Oznacz cel jako zrealizowany"}
                  />
                </div>
              </ConfirmationDialog>
            )}

            {props.data?.reached && (
              <div
                className={
                  "flex items-center gap-1 text-xs font-bold text-green-400"
                }
              >
                <IoMdCheckmarkCircle /> <span>Cel zrealizowany!</span>
              </div>
            )}

            <ModalFooter className={"flex flex-wrap gap-3"}>
              {/* <--- Delete goal confirmation ---> */}
              {props.data?.id && (
                <ConfirmationDialog
                  title={"Czy na pewno chcesz usunąć ten cel?"}
                  description={"Wykonanej operacji nie będzie dało się cofnąć!"}
                  onConfirm={() => removeGoal(props.data?.id)}
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

export default GoalModal;

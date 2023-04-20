import type { SchemaOf } from "yup";
import * as Yup from "yup";
import * as yup from "yup";
import type { IGoalData } from "../redux/GoalsInterfaces";

export const goalSchema: SchemaOf<IGoalData> = Yup.object()
  .shape({
    title: yup.string().min(1).max(50).required("Pole jest wymagane"),
    description: yup.string().max(255),
    type: yup.string().max(255).required("Pole jest wymagane"),
    startDate: yup.string().max(255).required("Pole jest wymagane"),
    endDate: yup.string().max(255).required("Pole jest wymagane"),
    goalValue: yup
      .number()
      .positive("Wartość nie może być ujemna")
      .required("Pole jest wymagane"),
    reached: yup.string().max(255).required("Pole jest wymagane"),
  })
  .required();

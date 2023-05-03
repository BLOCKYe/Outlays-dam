import type { IOperationRequest } from "../redux/OperationInterfaces";
import type { SchemaOf } from "yup";
import * as Yup from "yup";
import * as yup from "yup";
import moment from "moment";
import { OperationsTypesEnum } from "../../../../common/operations/OperationsTypesEnum";

export const initialValues: IOperationRequest = {
  date: moment(new Date()).format("yyyy-MM-DD"),
  title: "",
  description: "",
  type: OperationsTypesEnum.EXPENSE,
  value: 0,
  categories: [],
};

export const operationSchema: SchemaOf<any> = Yup.object().shape({
  title: yup.string().min(1).max(50).required("Pole jest wymagane"),
  description: yup.string().max(255),
  type: yup.string().max(255).required("Pole jest wymagane"),
  date: yup.string().max(255).required("Pole jest wymagane"),
  value: yup
    .number()
    .positive("Wartość nie może być ujemna")
    .required("Pole jest wymagane"),
  categories: yup.array(),
});

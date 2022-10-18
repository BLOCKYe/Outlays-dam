import {IOutlayRequest} from "../redux/OutlaysInterfaces";
import {SchemaOf} from "yup";
import * as Yup from "yup";
import * as yup from "yup";
import moment from "moment";

export const initialValues: IOutlayRequest = {
    date: moment(new Date()).format("yyyy-MM-DD"),
    title: '',
    description: '',
    value: 0,
    categories: []
}

export const outlaySchema: SchemaOf<any> = Yup.object().shape({
    title: yup.string().min(1).max(20).required('Pole jest wymagane'),
    description: yup.string().max(255),
    date: yup.string().max(255).required('Pole jest wymagane'),
    value: yup.number().positive('Wartość nie może być ujemna').required('Pole jest wymagane'),
    categories: yup.array()
});
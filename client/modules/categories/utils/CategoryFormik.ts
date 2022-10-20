import {SchemaOf} from "yup";
import * as Yup from "yup";
import * as yup from "yup";
import {ICategoryRequest} from "../redux/CategoriesInterfaces";

export const initialValues: ICategoryRequest = {
    name: '',
    color: ''
}

export const categorySchema: SchemaOf<any> = Yup.object().shape({
    name: yup.string().min(1).max(20).required('Pole jest wymagane'),
    color: yup.string().max(255),
});
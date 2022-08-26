/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 27/08/2022
 * Time: 01:08
*/

import * as Yup from "yup";
import {SchemaOf} from "yup";

export const registerSchema: SchemaOf<IRegisterSchema> = Yup.object().shape({
    password: Yup.string()
        .min(5, 'Hasło jest za kró†kie!')
        .max(20, 'Hasło jest za długie!')
        .required('Wymagane pole.'),
    name: Yup.string()
        .min(2, 'Nazwa jest za krótka!')
        .max(20, 'Nazwa jest za długa!')
        .required('Wymagane pole.'),
    email: Yup.string().email('Nieprawidłowy adres email').required('Wymagane pole.'),
});

export interface IRegisterSchema {
    email: string,
    password: string,
    name: string
}
/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 21/08/2022
 * Time: 12:22
*/

import * as Yup from "yup";
import {SchemaOf} from "yup";

export const loginSchema: SchemaOf<ILoginSchema> = Yup.object().shape({
    password: Yup.string()
        .min(5, 'Hasło jest za kró†kie!')
        .max(20, 'Hasło jest za długie!')
        .required('Wymagane pole.'),
    email: Yup.string().email('Nieprawidłowy adres email').required('Wymagane pole.'),
});

export interface ILoginSchema {
    email: string,
    password: string
}
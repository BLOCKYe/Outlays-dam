/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:49
*/

import React, {useState} from 'react';
import Image from "next/image";
import Button from "../../../common/components/buttons/Button";
import Input from "../../../common/components/inputs/Input";
import Link from "next/link";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import {useFormik} from "formik";
import {ILoginSchema, loginSchema} from "../utils/LoginFormik";
import {useDispatch} from "react-redux";
import {fetchUserProfile, login, register} from "../redux/UserRepository";
import {AppDispatch} from "../../../common/redux/store";
import {getCookie, setCookie} from "cookies-next";
import {useToast} from "@chakra-ui/react";
import {IRegisterSchema, registerSchema} from "../utils/RegisterFormik";

const LoginView = () => {
        const dispatch = useDispatch<AppDispatch>();
        const toast = useToast()
        const [isProcessing, setIsProcessing] = useState<boolean>(false)

        const formik = useFormik({
            validationSchema: registerSchema,
            validateOnChange: false,
            validateOnBlur: false,
            initialValues: {
                email: '',
                name: '',
                password: ''
            },

            onSubmit: values => submitForm(values).then()
        })


        /**
         * This method is used to submit form
         * @param values
         */

        const submitForm = async (values: IRegisterSchema) => {
            setIsProcessing(true)
            try {
                const response = await dispatch(register(values)).unwrap()
                setCookie('token', response.data?.accessToken)

                toast({
                    title: 'Pomyślne zarejestrowano',
                    status: 'success'
                })
            } catch (e: any) {
                toast({
                    title: e?.message,
                    status: 'error'
                })
            }

            setIsProcessing(false)
        }


        return (
            <MainWrapper variant={'small'}>

                <Link href={'/'}>
                    <div className={'relative max-w-[200px] mx-auto mt-10'}>
                        <Image src={'/logo.svg'} width={200} height={200} layout={'responsive'}
                            alt={'Outlays Dam'} priority className={'cursor-pointer'}/>
                    </div>
                </Link>

                <div className={'mt-5 text-center'}>
                    <div className={'text-3xl font-bold'}>
                        Outlays Dam
                    </div>

                    <div className={'mt-2 text-w-darker'}>
                        Utwórz konto, aby uzyskać dostęp do aplikacji.
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className={'mt-10 grid gap-3'}>
                        <Input placeholder={'Nazwa'} onChange={formik.handleChange} value={formik.values.name}
                            label={'Nazwa twojego konta'} type={'text'} err={formik.errors.name} name={'name'} />
                        <Input placeholder={'Email'} onChange={formik.handleChange} value={formik.values.email}
                            label={'Adres email'} type={'email'} err={formik.errors.email} name={'email'} />
                        <Input placeholder={'Hasło'} onChange={formik.handleChange} value={formik.values.password}
                            label={'Twoje hasło'} type={'password'} name={'password'} err={formik.errors.password} />
                    </div>

                    <div className={'mt-10 grid gap-2'}>
                        <Button variant={'CONTAINED'} text={'Zarejestruj'} type={'submit'} disabled={isProcessing} />
                    </div>
                </form>

            </MainWrapper>
        );
    }
;

export default LoginView;

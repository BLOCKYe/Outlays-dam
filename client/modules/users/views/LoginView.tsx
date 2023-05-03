/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:49
 */

import React, { useState } from "react";
import Image from "next/image";
import Button from "../../../common/components/buttons/Button";
import Input from "../../../common/components/inputs/Input";
import Link from "next/link";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import { useFormik } from "formik";
import type { ILoginSchema } from "../utils/LoginFormik";
import { loginSchema } from "../utils/LoginFormik";
import { useDispatch } from "react-redux";
import { login } from "../redux/UserRepository";
import type { AppDispatch } from "../../../common/redux/store";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Paths, { getPathBySection } from "../../../common/router/paths";
import { setToken } from "../redux/userSlice";

const LoginView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const formik = useFormik({
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => submitForm(values).then(),
  });

  /**
   * This method is used to submit form
   * and save token in cookies
   * @param values
   */
  const submitForm = async (values: ILoginSchema) => {
    setIsProcessing(true);
    try {
      const response = await dispatch(login(values)).unwrap();
      if (!response?.data) throw new Error();
      if (!response?.data?.accessToken) throw new Error();

      localStorage.setItem("token", response.data?.accessToken);
      await dispatch(setToken(response.data?.accessToken));

      await router.push(
        getPathBySection(response.data?.config?.defaultSection)
      );
    } catch (e: any) {
      toast({
        title: e?.message,
        status: "error",
      });
    }

    setIsProcessing(false);
  };

  return (
    <MainWrapper variant={"small"}>
      <Link href={"/"}>
        <div className={"relative mx-auto mt-10 max-w-[200px]"}>
          <Image
            src={"/logo.svg"}
            width={200}
            height={200}
            layout={"responsive"}
            alt={"Outlays Dam"}
            priority
            className={"cursor-pointer"}
          />
        </div>
      </Link>

      <div className={"mt-5 text-center"}>
        <div className={"text-3xl font-bold"}>Outlays Dam</div>

        <div className={"mt-2 text-w-darker"}>
          Zaloguj się na swoje konto, aby uzyskać dostęp do aplikacji.
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className={"mt-10 grid gap-3"}>
          <Input
            placeholder={"Email"}
            onChange={formik.handleChange}
            value={formik.values.email}
            label={"Adres email"}
            type={"email"}
            err={formik.errors.email}
            name={"email"}
          />
          <Input
            placeholder={"Hasło"}
            onChange={formik.handleChange}
            value={formik.values.password}
            label={"Twoje hasło"}
            type={"password"}
            name={"password"}
            err={formik.errors.password}
          />
        </div>

        <div className={"mt-10 grid gap-2"}>
          <Button
            variant={"CONTAINED"}
            text={"Zaloguj"}
            type={"submit"}
            disabled={isProcessing}
          />
        </div>

        <div className={"mt-10 text-sm"}>
          Nie posiadasz jeszcze konta?{" "}
          <Link href={Paths.REGISTER}>
            <span className={"cursor-pointer text-c-light hover:underline"}>
              Zarejestruj się
            </span>
          </Link>
        </div>
      </form>
    </MainWrapper>
  );
};
export default LoginView;

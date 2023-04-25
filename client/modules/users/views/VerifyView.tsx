/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:49
 */

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import { useDispatch } from "react-redux";
import { verifyUserAccount } from "../redux/UserRepository";
import type { AppDispatch } from "../../../common/redux/store";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Paths from "../../../common/router/paths";
import Button from "../../../common/components/buttons/Button";

/**
 * This function is used to parse query
 * to string
 * @param query
 */
const parseQuery = (query: string | string[] | undefined): string | null => {
  if (!query) return null;
  if (typeof query === "string") return query;
  if (Array.isArray(query) && query.length > 0) return query[0] ?? null;

  return null;
};

const VerifyView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const toast = useToast();
  const { query } = useRouter();

  /**
   * This function is used to
   * verify account
   */
  const verifyAccount = async () => {
    try {
      setIsProcessing(true);
      const verifyKeyQuery = parseQuery(query?.verifyKey);
      if (!verifyKeyQuery) throw new Error();

      await dispatch(verifyUserAccount({ verifyKey: verifyKeyQuery })).unwrap();

      setIsVerified(true);
      setIsProcessing(false);
    } catch (e: any) {
      toast({
        title: e?.message,
        status: "error",
      });

      setIsProcessing(false);
      setIsError(true);
    }
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

        <div className={"mt-2 text-w-darker"}>Weryfikacja konta.</div>
      </div>

      <div className={"mt-10 grid place-items-center"}>
        <Button
          disabled={isError || isVerified}
          variant={"CONTAINED"}
          text={"Zweryfikuj konto"}
          onClick={() => verifyAccount()}
        />
      </div>

      {/* <--- Processing state ---> */}
      {isProcessing && (
        <div className={"mt-5 text-center font-bold"}>
          Trwa weryfikacja konta...
        </div>
      )}

      {/* <--- Display error ---> */}
      {isError && (
        <div
          className={
            "mt-5 rounded-md border-[1px] border-red-900 bg-red-900 bg-opacity-25 p-1 text-center font-bold text-red-500"
          }
        >
          Nie udało się zweryfikować konta.
        </div>
      )}

      {/* <--- Display success ---> */}
      {isVerified && (
        <div
          className={
            "mt-5 rounded-md border-[1px] border-green-900 bg-green-900 bg-opacity-25 p-1 text-center font-bold text-green-500"
          }
        >
          Zweryfikowano konto!
        </div>
      )}

      {/* <--- Display login info ---> */}
      <div className={"mt-10 text-center text-sm font-bold"}>
        Wróć do{" "}
        <Link href={Paths.LOGIN}>
          <span className={"cursor-pointer text-c-light hover:underline"}>
            logowania
          </span>
        </Link>
      </div>
    </MainWrapper>
  );
};
export default VerifyView;

/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:49
 */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import { useDispatch } from "react-redux";
import { verify } from "../redux/UserRepository";
import type { AppDispatch } from "../../../common/redux/store";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Paths from "../../../common/router/paths";

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
  const toast = useToast();
  const { query } = useRouter();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        setIsProcessing(true);
        const verifyKeyQuery = parseQuery(query?.verifyKey);
        if (!verifyKeyQuery) throw new Error();

        await dispatch(verify({ verifyKey: verifyKeyQuery }));

        // send verify account request
        setIsProcessing(false);
        setIsVerified(true);
      } catch (e: any) {
        toast({
          title: e?.message,
          status: "error",
        });

        setIsProcessing(false);
      }
    };

    verifyAccount().then();
  }, [query?.verifyKey, toast]);

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

      {isProcessing && (
        <div className={"mt-10 text-center font-bold"}>
          Trwa weryfikacja konta...
        </div>
      )}

      {isVerified && (
        <div className={"mt-10 text-center font-bold"}>
          <div className={"text-xl"}>Zweryfikowano konto!</div>
          <div className={"mt-3 text-sm"}>
            Możesz się zalogować{" "}
            <Link href={Paths.LOGIN}>
              <span className={"cursor-pointer text-c-light hover:underline"}>
                tutaj
              </span>
            </Link>
          </div>
        </div>
      )}
    </MainWrapper>
  );
};
export default VerifyView;

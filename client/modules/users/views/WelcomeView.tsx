/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:48
 */

import React from "react";
import Image from "next/image";
import Button from "../../../common/components/buttons/Button";
import Link from "next/link";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import Paths from "../../../common/router/paths";

const WelcomeView = () => {
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
          Najwygodniejsza aplikacja do monitorowania swoich wydatków.
        </div>
      </div>

      <div className={"mt-10 grid gap-2"}>
        <Button variant={"CONTAINED"} link={Paths.LOGIN} text={"Zaloguj się"} />
        <Button
          variant={"OUTLINED"}
          link={Paths.REGISTER}
          text={"Zarejestruj się"}
        />
      </div>
    </MainWrapper>
  );
};

export default WelcomeView;

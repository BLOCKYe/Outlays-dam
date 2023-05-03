/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:51
 */

import type { NextPage } from "next";
import Head from "next/head";
import LoginView from "../../client/modules/users/views/LoginView";
import useAuth from "../../client/common/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Paths from "../../client/common/router/paths";
import LoaderView from "../../client/common/components/dashboard/LoaderView";

const Login: NextPage = () => {
  const { isAuth, isProcessing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push(Paths.OPERATIONS).then();
    }
  }, [isAuth, router]);

  return (
    <div>
      <Head>
        <title>Logowanie - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Zaloguj się do systemu." />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/mini.png" />
      </Head>

      {!isAuth && !isProcessing && <LoginView />}
      {isAuth && <LoaderView />}
    </div>
  );
};

export default Login;

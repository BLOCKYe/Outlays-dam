/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:51
 */

import type { NextPage } from "next";
import Head from "next/head";
import VerifyView from "../../client/modules/users/views/VerifyView";

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zweryfikuj konto - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Weryfikacja konta." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VerifyView />
    </div>
  );
};

export default Login;

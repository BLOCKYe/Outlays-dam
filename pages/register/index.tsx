/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:51
 */

import type { NextPage } from "next";
import Head from "next/head";
import RegisterView from "../../client/modules/users/views/RegisterView";

const Register: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Rejestracja - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RegisterView />
    </div>
  );
};

export default Register;

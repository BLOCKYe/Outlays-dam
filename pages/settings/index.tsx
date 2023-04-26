/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:51
 */

import type { NextPage } from "next";
import Head from "next/head";
import AuthMiddleware from "../../client/common/axios/authMiddleware";
import { useEffect } from "react";
import SettingsView from "../../client/modules/users/views/SettingsView";

const Home: NextPage = () => {
  useEffect(() => {
    AuthMiddleware.checkToken().then();
  }, []);

  return (
    <div>
      <Head>
        <title>Ustawienia - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Strona główna" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SettingsView />
    </div>
  );
};

export default Home;

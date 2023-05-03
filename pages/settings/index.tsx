/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:51
 */

import type { NextPage } from "next";
import Head from "next/head";
import SettingsView from "../../client/modules/users/views/SettingsView";
import LoaderView from "../../client/common/components/dashboard/LoaderView";
import useAuth from "../../client/common/hooks/useAuth";

const Home: NextPage = () => {
  const { isAuth } = useAuth();

  return (
    <div>
      <Head>
        <title>Ustawienia - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Ustawienia konta." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuth && <SettingsView />}
      {!isAuth && <LoaderView />}
    </div>
  );
};

export default Home;

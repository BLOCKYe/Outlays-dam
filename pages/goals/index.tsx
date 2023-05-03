/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 11.11.2022
 * Time: 23:29
 */

import type { NextPage } from "next";
import Head from "next/head";
import GoalsView from "../../client/modules/goals/views/GoalsView";
import useAuth from "../../client/common/hooks/useAuth";
import LoaderView from "../../client/common/components/dashboard/LoaderView";

const Goals: NextPage = () => {
  const { isAuth } = useAuth();

  return (
    <div>
      <Head>
        <title>Cele - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Wszystkie twoje cele." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuth && <GoalsView />}
      {!isAuth && <LoaderView />}
    </div>
  );
};

export default Goals;

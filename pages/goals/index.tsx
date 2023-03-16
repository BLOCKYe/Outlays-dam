/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 11.11.2022
 * Time: 23:29
 */

import type { NextPage } from "next";
import Head from "next/head";
import AuthMiddleware from "../../client/common/axios/authMiddleware";
import { useEffect } from "react";
import GoalsView from "../../client/modules/goals/views/GoalsView";

const Goals: NextPage = () => {
  useEffect(() => {
    AuthMiddleware.checkToken().then();
  }, []);

  return (
    <div>
      <Head>
        <title>Cele - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Wszystkie twoje cele." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GoalsView />
    </div>
  );
};

export default Goals;

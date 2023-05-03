/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 11.11.2022
 * Time: 23:29
 */

import type { NextPage } from "next";
import Head from "next/head";
import AnalyticsView from "../../client/modules/analytics/views/AnalyticsView";
import useAuth from "../../client/common/hooks/useAuth";
import LoaderView from "../../client/common/components/dashboard/LoaderView";

const Analytics: NextPage = () => {
  const { isAuth } = useAuth();

  return (
    <div>
      <Head>
        <title>Analityka - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Dokładne statystyki." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuth && <AnalyticsView />}
      {!isAuth && <LoaderView />}
    </div>
  );
};

export default Analytics;

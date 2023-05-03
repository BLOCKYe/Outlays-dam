/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:51
 */

import type { NextPage } from "next";
import Head from "next/head";
import CategoriesView from "../../client/modules/categories/views/CategoriesView";
import useAuth from "../../client/common/hooks/useAuth";
import LoaderView from "../../client/common/components/dashboard/LoaderView";

const Home: NextPage = () => {
  const { isAuth } = useAuth();

  return (
    <div>
      <Head>
        <title>Kategorie - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Lista wszystkich twoich kategorii." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuth && <CategoriesView />}
      {!isAuth && <LoaderView />}
    </div>
  );
};

export default Home;

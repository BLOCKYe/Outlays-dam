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
import CategoriesView from "../../client/modules/categories/views/CategoriesView";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    AuthMiddleware.checkToken().then();
  }, []);

  return (
    <div>
      <Head>
        <title>Kategorie - Outlays Dam - monitoruj swoje wydatki</title>
        <meta name="description" content="Lista wszystkich twoich kategorii." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CategoriesView />
    </div>
  );
};

export default Home;

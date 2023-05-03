import type { NextPage } from "next";
import Head from "next/head";
import WelcomeView from "../client/modules/users/views/WelcomeView";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Outlays Dam - monitoruj swoje wydatki</title>
        <meta
          name="description"
          content="Najwygodniejsza aplikacja do monitorowania swoich wydatków."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/mini.png" />
      </Head>

      <WelcomeView />
    </div>
  );
};

export default Home;

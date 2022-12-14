import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import WelcomeView from "../client/modules/users/views/WelcomeView";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Outlays Dam - monitoruj swoje wydatki</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <WelcomeView />

        </div>
    )
}

export default Home

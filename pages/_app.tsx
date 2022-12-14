import '../client/common/styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {wrapper} from '../client/common/redux/store'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default wrapper.withRedux(MyApp);

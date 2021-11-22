import { SessionProvider } from 'next-auth/react';
import '../pages/styles/globals.css';
import {RecoilRoot} from "recoil";

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
  <SessionProvider session={session}>
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  </SessionProvider>
  )
}

export default MyApp

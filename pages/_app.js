import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from "next/head";

import { wrapper } from "../redux/store"
import { SnackbarProvider } from 'notistack';
import Loader from "../helper/loader/loader";
import {SnackbarUtilsConfigurator} from "../helper/showSnackBar";
import RouterGuard from "../helper/role/RouterGuard";

function MyApp({ Component, pageProps }) {
  return (
    <div className="next-root-app">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Vaccinations</title>
      </Head>
        <Loader/>
        <SnackbarProvider  maxSnack={10}>
            <SnackbarUtilsConfigurator/>
            <RouterGuard>
                <Component {...pageProps} />
            </RouterGuard>
        </SnackbarProvider>
    </div>
  );
}

export default wrapper.withRedux(MyApp);

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";

import { GlobalProvider, GlobalContext } from "../src/context/GlobalContext";
import theme from "../src/utils/theme";
import axios from "../src/utils/axios";
import Loading from "../src/reusable/loading";
import createEmotionCache from "../src/createEmotionCache";
import { jwtKey } from "../src/data/websiteInfo";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const publicPages = [];
const allowedAuthPages = [];

const Main = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(
    publicPages.some((p) => router.pathname === p) ||
      allowedAuthPages.some((p) => router.pathname === p)
      ? false
      : true
  );
  const { setAuth } = useContext(GlobalContext);

  useEffect(() => {
    const fetchToken = async () => {
      if (!allowedAuthPages.some((p) => router.pathname === p)) {
        setLoadingAuth(true);
      }
      let Token = null;
      try {
        Token = await localStorage.getItem(jwtKey);
      } catch (e) {
        console.log("Error Fetching jwt Token");
        setLoadingAuth(false);
      }
      if (Token != null) {
        setAuth({ token: Token });
        setLoadingAuth(false);

        //validate Token Here from server or async storage to find user state
        //validating through server
        // try {
        //   const result = await axios.post('/users/validateToken', null, {
        //     headers: {
        //       authorization: 'Bearer ' + Token,
        //     },
        //   });
        //   if (result.data.status === 'success') {
        //     setAuth({ ...result.data.data.user, token: Token });
        //     console.log(result.data.data.user.portfolio);
        //   }
        //   setLoadingAuth(false);
        //   if (result.data.status === 'success') {
        //     updateUserActivity(Token);
        //   }
        // } catch (e) {
        //   setLoadingAuth(false);
        // }
      } else {
        setLoadingAuth(false);
      }
    };
    if (!publicPages.some((p) => router.pathname === p)) {
      fetchToken();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loadingAuth) {
    return <Loading />;
  }

  return (
    <>
      <Component {...pageProps} loadingAuth={loadingAuth} />
    </>
  );
};
export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <GlobalProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Main Component={Component} pageProps={pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </GlobalProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/globals.css";
import { Provider } from "react-redux";
import { store } from "redux/Store";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <Provider store={store}>
          <Head>
            {/* google font css */}
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />

            {/* responsive meta */}
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=5"
            />
          </Head>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
};

export default App;

import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/globals.css";
import { Provider } from "react-redux";
import { store } from "redux/Store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    const pathName = router?.pathname
      .toLowerCase()
      .replace(/[^\w-]+/g, "")
      .replace("_", " ")
      .split(" ");
    const item = pathName
      .map((item) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
      })
      .join(" ");

    // console.log(item);
    //  dispatch(sidebarActions.selectedCategory(item));
  }, [router?.pathname]);

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

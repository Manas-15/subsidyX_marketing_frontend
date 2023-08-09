import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/globals.css";
import { Provider } from "react-redux";
import { store } from "redux/Store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader } from "@layouts/components/Loader";
import setupInterceptors from "../redux/setupInterceptors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [showChild, setShowChild] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [accessTokenJSON, setAccessTokenJSON] = useState();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setAccessTokenJSON(localStorage.getItem("accessToken"));
  //   }
  // }, []);
  // console.log(accessTokenJSON);
  // useEffect(() => {
  //   if (accessTokenJSON) {
  //     let accessToken = JSON.parse(accessTokenJSON);
  //     console.log(accessToken);
  //   } else {
  //     if (
  //       (!accessTokenJSON && router.pathname === "/dashboard") ||
  //       (!accessTokenJSON && router.pathname === "/report/all-report-list") ||
  //       (!accessTokenJSON && router.pathname === "/report/confirm-report") ||
  //       (!accessTokenJSON && router.pathname === "/report/final-report") ||
  //       (!accessTokenJSON && router.pathname === "/report/view-report") ||
  //       (!accessTokenJSON && router.pathname === "/payment") ||
  //       (!accessTokenJSON && router.pathname === "/questions") ||
  //       (!accessTokenJSON && router.pathname === "/questions-after-eligible")
  //     ) {
  //       router.push("/login");
  //       console.log("accessToken not found in localStorage.");
  //     }
  //   }
  // }, [accessTokenJSON, router.pathname]);

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
    setupInterceptors(store, router); // Call setupInterceptors within the component
  }, [router]); // Include router as a dependency

  useEffect(() => {
    const handleStart = (url) => {
      // Show the loader when navigation starts
      setLoading(true);
    };

    const handleComplete = (url) => {
      // Hide the loader when navigation is complete
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Clean up the event listeners when the component unmounts
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
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
          {loading && <Loader />}
          <Component {...pageProps} />
          <ToastContainer theme="colored" />
        </Provider>
      </>
    );
  }
};

export default App;

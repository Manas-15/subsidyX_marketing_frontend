import config from "@config/config.json";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "redux/Actions/alertAction";
import { notification } from "antd";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./partials/DashboardHeader";
import { userActions } from "redux/Actions/userAction";

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const router = useRouter();
  const dispatch = useDispatch();
  const [reportData, setReportData] = useState(0);

  // const alert = useSelector((state) => state.alert);
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    dispatch(userActions.clearSignup());
  }, [router.pathname]);

  // useEffect(() => {
  //   dispatch(alertActions.clear());
  // }, [router.pathname]);

  // if (alert.message) {
  //   setTimeout(() => {
  //     dispatch(alertActions.clear());
  //   }, 5000);
  // }
  // const openNotificationWithIcon = (type, message) => {
  //   notification[type]({
  //     message: message,
  //   });
  // };

  return (
    <>
      <Head>
        {/* title */}
        <title>subsidyX</title>
        {/* canonical url */}
        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}
        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}
        {/* meta-description */}
        <meta name="description" content={"bbbcbb"} />
        {/* author from config.json */}
        <meta name="author" content={meta_author} />
        {/* og-title */}
        <meta property="og:title" content={"bbbcbb"} />
        <link
          rel="shortcut icon"
          href="images/favicon.ico"
          type="image/x-icon"
        />
        <link rel="icon" href="images/favicon.ico" type="image/x-icon" />
        {/* og-description */}
        <meta property="og:description" content={"bbbcbb"} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${base_url}/${router.asPath.replace("/", "")}`}
        />
        {/* twitter-title */}
        <meta name="twitter:title" content={"bbbcbb"} />
        {/* twitter-description */}
        <meta name="twitter:description" content={"bbbcbb"} />
        {/* og-image */}
        <meta
          property="og:image"
          content={`${base_url}${image ? image : meta_image}`}
        />
        {/* twitter-image */}
        <meta
          name="twitter:image"
          content={`${base_url}${image ? image : meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {/* GTM head script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T3JRK664');
      `,
        }}
      />

      <main className="subsid_login_page">
        {router?.pathname === "/" ||
        router?.pathname === "/services" ||
        router?.pathname === "/about" ||
        router?.pathname === "/contact" ||
        router?.pathname === "/login" ||
        router?.pathname === "/signup" ? (
          <>
            <Header />
            {children}
            {(router?.pathname === "/" ||
              router?.pathname === "/services" ||
              router?.pathname === "/about" ||
              router?.pathname === "/contact") && <Footer />}
          </>
        ) : router?.pathname === "/report/all-report-list" ? (
          <>
            <div className="base_layout">
              {user?.user_details?.report_count > 0 && <Sidebar />}

              <main className="mainBodyWidth ml-auto w-100">
                <Header />
                <DashboardHeader />
                <div>{children}</div>
              </main>
            </div>
          </>
        ) : router?.pathname === "/report/view-report" ? (
          <>
            <div className="base_layout">
              <Sidebar />
              <main className="mainBodyWidth ml-auto w-100">
                <Header />
                <DashboardHeader />
                <div>{children}</div>
              </main>
            </div>
          </>
        ) : (
          <div className="base_layout">
            {user?.user_details?.report_count > 0 && <Sidebar />}

            <main className="mainBodyWidth ml-auto w-100">
              <Header />
              <div>{children}</div>
            </main>
          </div>
        )}
      </main>
      {/* GTM body noscript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-T3JRK664"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
};

export default Base;

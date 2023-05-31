import config from "@config/config.json";
import Footer from "@layouts/partials/Footer";
import Header from "@layouts/partials/Header";
import Head from "next/head";
import { useRouter } from "next/router";

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
  console.log(router.pathname);

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
      <main className="subsid_login_page">
        <Header />
        {/* main site */}

        {children}

        {(router?.pathname === "/" ||
          router?.pathname === "/services" ||
          router?.pathname === "/about" ||
          router?.pathname === "/contact") && <Footer />}
      </main>
    </>
  );
};

export default Base;

import NextNprogress from "nextjs-progressbar";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress />
      <Head>
        <title>#MonaJudeNi!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="#MonaJudeNi!" />
        <meta
          property="og:description"
          content="Wanna be part of something amazing?"
        />
      </Head>
      <div className="">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;

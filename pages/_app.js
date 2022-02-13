import NextNprogress from 'nextjs-progressbar';
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress/>
      <Head>
        <title>#KeZesIT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

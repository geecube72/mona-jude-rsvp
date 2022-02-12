import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNprogress/>
      <Component {...pageProps} />;
    </>
  )
}

export default MyApp

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
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="#KeZesIt"/>
        <meta property="og:description"
              content="Keziah and Zester's wedding."/>
        <meta property="og:image"
              content="https://scontent.fceb6-1.fna.fbcdn.net/v/t1.6435-9/80971636_2773593329387196_583489655261888512_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=esS0T0i1wrcAX_pN6xX&_nc_oc=AQnRXnlaYPNA0z7-SIQkcPXa0f-q29KAxP3kTsQ8LbVMQ8XIj0ckjjdq8adKcKWbTIc&_nc_ht=scontent.fceb6-1.fna&oh=00_AT9M2sjD9GOZCR9hvw2XFn6XXl-RlfhM1gMhmcQL4WtL_A&oe=623F5C74"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

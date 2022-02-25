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
              content="Wanna be part of something amazing?"/>
        <meta property="og:image"
              content="https://instagram.fceb6-1.fna.fbcdn.net/v/t51.2885-15/132331036_777795976156427_3432887419334943620_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.fceb6-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=0OU3N30p9cYAX_mAEI9&edm=AABBvjUBAAAA&ccb=7-4&oh=00_AT84BfBiWjnHjmsU_TYMuPJyO8w3mN2lJFcXVEES4YgGng&oe=621EB3BA&_nc_sid=83d603"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

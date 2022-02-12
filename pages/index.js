import router from 'next/router';
import { useEffect } from 'react';
import useGetGuestNames from '../helpers/get-guests-names';
import axios from 'axios';

let urlNames = ['Michael', 'Maye']

export default function Home(props) {
  const guests = useGetGuestNames(props)

  useEffect(() => {
    router.push(`/?names=${encodeURIComponent(urlNames)}`)
  }, [])

  return (
    <div className={'h-screen flex justify-center items-center'}>
      <div className="text-3xl w-full text-center flex-col">
        <div className={'px-10'}>
          <h1 className="font-wonderful-branding font-bold text-4xl tracking-wider text-brand"
              style={{ lineHeight: '3rem' }}>
            {'Not April Fools cos yes it\'s true!'}
          </h1>
        </div>
        <div className={'mb-5'}>
          <span className="font-nixie-one text-xl">#KeZesIT on 1 April 2022</span>
        </div>
        <div className="px-5">
          <div className="font-nixie-one  text-2xl mb-5">
            So... {guests}, will you RSVP?
          </div>
          <div className={'font-nixie-one text-lg mb-8 text-left flex flex-col'}>
            <div className="flex lg:justify-center md:lg:justify-center mb-3">
              <input
                className="rounded-full h-4 w-4 border accent-brand border-gray-300 bg-white mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
              <label className="form-check-label inline-block text-gray-800"
                     htmlFor="flexRadioDefault1">
                accepts with joy
              </label>
            </div>
            <div
              className="flex lg:justify-center md:lg:justify-center">
              <input
                className="w-4 h-4 rounded-full border accent-brand border-gray-300 bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
              <label className="inline-block text-gray-800 flex-1"
                     htmlFor="flexRadioDefault2">
                will celebrate from afar
                <p className={'font-nixie-one text-xs leading-4 mb-5'}>
                  {`Getting married during the pandemic is truly challenging and we would totally
                understand if you won't be able to make it due to the restrictions. We have prepared
                for this and made sure you can still celebrate with us from afar by clicking the
                hyperlink below:`}
                </p>
                <a
                  href={'https://us05web.zoom.us/j/3060756566?pwd=cytmOXJ1TC9OUGNSVnFTRE9nUnhDQT09'}
                  target={'_blank'}
                  className={'text-lg font-wonderful-branding underline text-brand'}
                  rel="noreferrer">Take me to the wedding!</a>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  return ctx.query
}

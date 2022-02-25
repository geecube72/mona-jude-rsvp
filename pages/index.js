import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import useGetGuestNames from '../helpers/get-guests-names';


export default function Home(props) {
  const guests = useGetGuestNames(props)
  const rsvpValue = useRef(0)
  const [sheetValue, setSheetValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (guests) {
      (async () => {
        try {
          setLoading(true)
          const response = await axios.get(
            `api/get-row?column=${props.column}&names=${encodeURIComponent(guests)}`
          )

          if (response.data.values[0].length > 1) {
            setSheetValue(response.data.values[0][1])
          }
        } catch (error) {
          console.log(error.response)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [props, guests])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    try {
      setSubmitting(true)
      const response = await axios.patch(
        `api/update-row?column=${props.column}&names=${encodeURIComponent(guests)}`,
        { going: rsvpValue.current }
      )

      setSheetValue(rsvpValue.current === '1' ? 'Yes' : 'No')
    } catch (error) {
      console.log(error.response)
    } finally {
      setSubmitting(false)
    }
  }, [props, guests])

  const handleOnChange = (e) => {
    rsvpValue.current = e.target.value
  }

  if (loading) {
    return (
      <div className={'h-screen flex justify-center items-center'}>
        <div className="text-3xl w-full text-center flex-col">
          <div className={'px-10 pt-20'}>
            <h1 className="font-wonderful-branding font-bold text-4xl tracking-wider text-brand"
                style={{ lineHeight: '3rem' }}>
              {'Loading'}
            </h1>
          </div>
        </div>
      </div>
    )
  }

  if (sheetValue === 'No') {
    return (
      <div className={'h-screen flex justify-center items-center'}>
        <div className="text-3xl w-full text-center flex-col">
          <div className={'px-10 pt-20'}>
            <h1
              className="font-wonderful-branding font-bold text-4xl tracking-wider text-brand mb-10"
              style={{ lineHeight: '3rem' }}>
              We understand!
            </h1>
            <h5 className="font-nixie-one font-bold text-2xl tracking-wider text-brand mb-2">
              We hope to see you in zoom then
            </h5>
            <a
              href={'https://us05web.zoom.us/j/3060756566?pwd=cytmOXJ1TC9OUGNSVnFTRE9nUnhDQT09'}
              target={'_blank'}
              className={'text-lg font-wonderful-branding text-brand underline'}
              rel="noreferrer">Take me to the wedding!</a>
          </div>
        </div>
      </div>
    )
  }

  if (sheetValue === 'Yes') {
    return (
      <div className={'h-screen flex justify-center items-center'}>
        <div className="text-3xl w-full text-center flex-col">
          <div className={'px-10 pt-20'}>
            <h1 className="font-wonderful-branding font-bold text-4xl tracking-wider text-brand"
                style={{ lineHeight: '3rem' }}>
              {'See you there!'}
            </h1>
          </div>
        </div>
      </div>
    )
  }

  if (!loading && !sheetValue) {
    return (
      <div className={'h-screen flex justify-center items-center'}>
        <div className="text-3xl w-full text-center flex-col">
          <div className={'px-10 pt-20'}>
            <h1 className="font-wonderful-branding font-bold text-4xl tracking-wider text-brand"
                style={{ lineHeight: '3rem' }}>
              {'Not April Fools cos yes it\'s true!'}
            </h1>
          </div>
          <div className={'mb-5'}>
            <span className="font-nixie-one text-xl text-brand-dark">#KeZesIT on 1 April 2022</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-5">
              <div className="font-nixie-one text-2xl mb-5 text-brand-dark">
                So... {guests}, will you RSVP?
              </div>
              <div
                className={'font-nixie-one text-lg mb-8 text-left flex flex-col text-brand-dark'}>
                <div className="flex lg:justify-center md:lg:justify-center mb-3">
                  <input
                    onChange={handleOnChange}
                    className="rounded-full h-4 w-4 border accent-brand border-gray-300 bg-white mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio" name="flexRadioDefault" value={1} id="flexRadioDefault1"/>
                  <label className="form-check-label inline-block"
                         htmlFor="flexRadioDefault1">
                    accepts with joy
                  </label>
                </div>
                <div
                  className="flex lg:justify-center md:lg:justify-center">
                  <input
                    onChange={handleOnChange}
                    className="w-4 h-4 rounded-full border accent-brand border-gray-300 bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio" name="flexRadioDefault" value={0} id="flexRadioDefault2"/>
                  <label className="inline-block flex-1"
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
                      className={'text-lg font-wonderful-branding text-brand underline'}
                      rel="noreferrer">Take me to the wedding!</a>
                  </label>
                </div>
              </div>
              <div className={'pb-10'}>
                <button
                  disabled={submitting}
                  className="font-wonderful-branding text-lg pt-2 px-6 font-semibold rounded-full bg-brand text-white text-center"
                  type="submit">
                  submit response
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Home.getInitialProps = async (ctx) => {
  return ctx.query
}

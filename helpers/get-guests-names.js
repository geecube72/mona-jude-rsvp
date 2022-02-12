import router from 'next/router';
import { useEffect, useState } from 'react';


export default function useGetGuestNames(props) {
  const [guests, setGuests] = useState(null)

  useEffect(() => {
    if (props.names) {
      const names = props.names.split(',').map((value, key, data) => {
        if (data.length - 1 === key) {
          return value
        }
        if (data.length - 2 === key) {
          return `${value} and`
        }

        return `${value},`
      })

      setGuests(names.join(' '))
    }
  }, [props])

  return guests
}
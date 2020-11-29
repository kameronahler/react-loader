import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ProfileCard() {
  const [user, setUser] = useState(null)

  console.log(`mounted state`, user)

  const fetchData = async () => {
    console.log('start useEffect')
    try {
      let res = await axios.get('https://randomuser.me/api/?nat=US')
      console.log('using res.data.results[0]')
      console.log('building state object based on res...')

      const resData = res.data.results[0]
      const newState = {
        age: resData.dob.age,
        id: resData.login.uuid,
        img: resData.picture.large,
        location: {
          city: resData.location.city,
          state: resData.location.state,
        },
        name: {
          first: resData.name.first,
          last: resData.name.last,
        },
      }

      console.log('updating state...')
      setUser(newState)
    } catch {
      console.log('catch')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 1000)
  }, [])

  if (user) {
    return (
      <section>
        <img src={user.img} alt='' />
        <header>
          <h1>{`${user.name.first} ${user.name.last}`}</h1>
        </header>
        <p>{user.age}</p>
        <p>{`${user.location.city}, ${user.location.state}`}</p>
      </section>
    )
  } else {
    return <p>Loading...</p>
  }
}

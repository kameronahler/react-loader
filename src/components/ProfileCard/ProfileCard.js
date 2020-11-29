import React, { useState, useEffect } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import './ProfileCard.scss'
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
      <div className='animated'>
        <CSSTransitionGroup
          transitionName='profile-card-'
          transitionAppear={true}
          transitionAppearTimeout={5000}
        >
          <section>
            <img src={user.img} alt='' />
            <header>
              <h1>{`${user.name.first} ${user.name.last}`}</h1>
            </header>
            <p>{user.age}</p>
            <p>{`${user.location.city}, ${user.location.state}`}</p>
          </section>
        </CSSTransitionGroup>
      </div>
    )
  } else {
    return (
      <section>
        <header>
          <h6>Loading...</h6>
        </header>
      </section>
    )
  }
}

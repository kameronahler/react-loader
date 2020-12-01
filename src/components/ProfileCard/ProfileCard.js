import React, { useState, useEffect } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import './ProfileCard.scss'
import axios from 'axios'

export default function ProfileCard() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      let res = await axios.get('https://randomuser.me/api/?nat=US')
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
      setUser(newState)
    } catch (error) {
      if (error.statusText === 'OK') {
        setError(`Couldn't retrieve data`)
      } else {
        setError(`Network error`)
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 5000)
  }, [])

  if (user) {
    return (
      <div className='animated'>
        <CSSTransitionGroup
          transitionName='profile-card-'
          transitionAppear={true}
          transitionAppearTimeout={5000}
        >
          <section className='profile-card'>
            <img className='profile-card__img' src={user.img} alt='' />
            <header className='profile-card__header'>
              <h1 className='profile-card__name'>{`${user.name.first} ${user.name.last}`}</h1>
            </header>
            <p className='profile-card__age'>{user.age}</p>
            <p className='profile-card__location'>{`${user.location.city}, ${user.location.state}`}</p>
          </section>
        </CSSTransitionGroup>
      </div>
    )
  } else if (error) {
    return (
      <section className='profile-card profile-card--error'>
        <div className='profile-card__img profile-card__img--error' />
        <div className='profile-card__header profile-card__header--error'>
          <div className='profile-card__name profile-card__name--error'>
            {error}
          </div>
        </div>
        <div className='profile-card__age profile-card__age--error'></div>
        <div className='profile-card__location profile-card__location--error'></div>
      </section>
    )
  } else {
    return (
      <section className='profile-card profile-card--loading'>
        <div className='profile-card__img profile-card__img--loading' />
        <div className='profile-card__header profile-card__header--loading'>
          <div className='profile-card__name profile-card__name--loading'></div>
        </div>
        <div className='profile-card__age profile-card__age--loading'></div>
        <div className='profile-card__location profile-card__location--loading'></div>
      </section>
    )
  }
}

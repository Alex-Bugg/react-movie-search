import React, { useEffect, useState } from 'react'
import { Card, Loader } from '../component'

export default function Profile() {

const [films,setFilms] = useState([])

useEffect(() => {
  changeType('favorite')
}, [])

const changeType = (type) => {
  const ids = JSON.parse(localStorage.getItem(type)).forEach(async(item) => {
    const resp = await fetch(`http://www.omdbapi.com/?apikey=b303083c&i=${item}`)
    const json = await resp.json();
    setFilms((prev) => {
      return [...prev, json]
    })
  })
}


const choseTab = (e) => {
  if(e.target.classList.length < 2) {
    document.querySelectorAll('.tab').forEach(item => {
      item.classList.remove('active_tab')
    })
    e.target.classList.add('active_tab')
    const type = ['favorite', 'later', 'watched']
    const wrap = [...document.querySelector('.tabs_wrap').children].forEach((item,i) => {
      if(item.classList.contains('active_tab')) {
        setFilms([])
        changeType(type[i])
      }
    })
  }
  console.log(films)
}

  return (
    <div className='main_profile'>
      <div className="tabs_wrap">
        <button onClick={choseTab} className="tab active_tab">FAVORITE</button>
        <button onClick={choseTab} className="tab">WATCH LATER</button>
        <button onClick={choseTab} className="tab">WATCHED</button>
      </div>
        <div className="container">
          <div className="cards_wrap">
            {
              films.length
              ? films.map(item => <Card key={item.imdbID} id={item.imdbID} item={item}/>)
              : <Loader />
            }
          </div>
        </div>
    </div>
  )
}

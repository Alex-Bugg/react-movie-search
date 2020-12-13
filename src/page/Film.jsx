import React, { useEffect, useState } from 'react'
import { Loader } from '../component'

export default function Film(props) {
  const [film,setFilm] = useState()
  const [favorite,setFavorite] = useState()
  const [later,setLater] = useState()
  const [watched,setWatched] = useState()

  const types = ['favorite', 'later', 'watched']

  const id = props.location.pathname.split('').splice(6).join('')

  useEffect(async () => {
    const resp = await fetch(`http://www.omdbapi.com/?apikey=b303083c&i=${id}`)
    const json = await resp.json();
    setFilm(json)
    types.forEach((item, i) => {
      const type = JSON.parse(localStorage.getItem(item))
      if(type.indexOf(id) !== -1 && i === 0) {
        setFavorite(true)
      } else if (type.indexOf(id) !== -1 && i === 1) {
        setLater(true)
      } else if (type.indexOf(id) !== -1 && i === 2) {
        setWatched(true)
      }
    })

  },[])

  const addTo = (param) => {
    if(!localStorage.getItem(param)) {
      localStorage.setItem(param, JSON.stringify([id]))
    } else {
      let storage = JSON.parse(localStorage.getItem(param))
      console.log(storage)
      if(storage.indexOf(id) === -1) {
        storage.push(id)
        storage = JSON.stringify([...new Set(storage)])
        localStorage.setItem(param, storage)
      } else {
        let idx = storage.indexOf(id)
        storage.splice(idx,1)
        storage = JSON.stringify([...new Set(storage)])
        localStorage.setItem(param, storage)
      }
    }
    if(types.indexOf(param) !== -1 && types.indexOf(param) === 0) {
      setFavorite((prev)=> !prev)
    } else if (types.indexOf(param) !== -1 && types.indexOf(param) === 1) {
      setLater((prev)=> !prev)
    } else if (types.indexOf(param) !== -1 && types.indexOf(param) === 2) {
      setWatched((prev)=> !prev)
    }
  }

  return (
    <div className="film_wrap">
      {
        film
        ? <div className="film">
        <img src={film.Poster} alt="poster" className="poster"/>
        <div className="film_info_wrap">
          <div className="film_info">
            <h2 className="film_name">{film.Title}</h2>
            <p className='film_text plot'>{film.Plot}</p>
            <table>
              <tbody>
                <tr className="film_text">
                  <td>Year</td>
                  <td>{film.Year}</td>
                </tr>
                <tr className="film_text">
                  <td>Rated</td>
                  <td>{film.Rated}</td>
                </tr>
                <tr className="film_text">
                  <td>Released</td>
                  <td>{film.Released}</td>
                </tr>
                <tr className="film_text">
                  <td>Runtime</td>
                  <td>{film.Runtime}</td>
                </tr>
                <tr className="film_text">
                  <td>Genre</td>
                  <td>{film.Genre}</td>
                </tr>
                <tr className="film_text">
                  <td>Writer</td>
                  <td>{film.Writer}</td>
                </tr>
                <tr className="film_text">
                  <td>Actors</td>
                  <td>{film.Actors}</td>
                </tr>
                <tr className="film_text">
                  <td>Country</td>
                  <td>{film.Country}</td>
                </tr>
                <tr className="film_text">
                  <td>Awards</td>
                  <td>{film.Awards}</td>
                </tr>
                <tr className="film_text">
                  <td>Ratings:</td>
                  <td>
                  Metacritic-{film.Ratings[0].Value}
                  <br/>
                  imdbRating-{film.imdbRating}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="wrap_btn">
            <button onClick={() => addTo('favorite')} className="btn_add">
              {
                favorite
                ? 'Remove from favorite'
                : 'Add to favorite'
              }
            </button>
            <button onClick={() => addTo('later')} className="btn_add">
              {
                later
                ?'Remove from watch later'
                :'Watch later'
              }
            </button>
            <button onClick={() => addTo('watched')} className="btn_add">
              {
                watched
                ?'Watch'
                :'Watched'
              }
            </button>
          </div>
        </div>
      </div>
        : <Loader />
      }
    </div>
  )
}

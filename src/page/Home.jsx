import React, { useState } from 'react'
import {Card, Paginate, Search} from '../component'

export default function Home() {

  const [search,setSearch] = useState()
  const [page,setPage] = useState(1)
  const [library,setLibrary] = useState([])
  const [err,setErr] = useState({
    text:'Let\'s try find some films', 
    class: false
  })

  const findFilm = async (e) => {
    if(e.key === 'Enter' && e.target.value.trim()) {
      const resp = await fetch(`http://www.omdbapi.com/?apikey=b303083c&s=${e.target.value.trim()}`)
      const json = await resp.json();
      if (json.Response === 'True') {
        setLibrary(json.Search)
        setSearch(e.target.value)
      } else {
        setErr({
        text:'Not a single movie was found',
        class: true
      })
      setLibrary([])
      }
    }
  }

  const prevPage = async () => {
    if(page !== 1 ) {
      setPage(prev => prev - 1)
      const resp = await fetch(`http://www.omdbapi.com/?apikey=b303083c&s=${search}&page=${page}`)
      const json = await resp.json();
      if (json.Response === 'True') {
        setLibrary(json.Search)
      }
    }
  }
  
  const nextPage = async () => {
    setPage(prev => prev + 1)
    const resp = await fetch(`http://www.omdbapi.com/?apikey=b303083c&s=${search}&page=${page}`)
    const json = await resp.json();
    if (json.Response === 'True') {
      setLibrary(json.Search)
    }
  }

  return (
    <div className="main">
      <Search find={findFilm} />
      <div className="container">
        <div className="cards_wrap">
          { library.length
          ? library.map(item => <Card key={item.imdbID} id={item.imdbID} item={item}/> )
          : <p 
          className={err.class ? 'err' : ''}
          >
            {err.text}
          </p>}
        </div>
        <div className="pagingation_wrap">
          {
            search
            ? <Paginate nextPage={nextPage} prevPage={prevPage}/>
            : ''
          }
        </div>
      </div>
    </div>
  )
}

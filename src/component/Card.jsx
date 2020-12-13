import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Card({id, item}) {
  return (
    <Link to={`/film/${id}`} className="card">
      <img src={item.Poster} alt="poster" />
      <h4 className="card_title">{item.Title}</h4>
    </Link>
  )
}

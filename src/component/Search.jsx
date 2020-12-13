import React from 'react'

export default function Search({find}) {
  return (
    <label>
      <input onKeyPress={find} className="search" type="text" placeholder="Find your film..." />
    </label>
  )
}

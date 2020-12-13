import React from 'react'

function Paginate({prevPage,nextPage}) {
  return (
    <div className="pagination">
      <button onClick={prevPage}>&laquo;</button>
      <button onClick={nextPage}>&raquo;</button>
    </div>
  )
}

export default Paginate

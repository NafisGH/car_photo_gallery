import React, { useState } from 'react'
import StyledPagination from './StyledPagination'

const Pagination = () => {
    const [page, setPage] = useState(1)
  return (
    <StyledPagination className="pagination">
        <button className='btn-pagination prev'>PREVIOUS</button>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <button className='btn-pagination next'>NEXT</button>
    </StyledPagination>
  )
}

export default Pagination
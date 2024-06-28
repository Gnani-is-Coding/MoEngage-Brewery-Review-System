import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar-container'>
      <nav className='navbar'>
        <Link to="/" style={{textDecoration: 'none'}}>
          <h1 className='navbar-heading'>Brewery Reviews</h1>
          </Link>
      </nav>  
    </div>
    
  )
}

export default Navbar
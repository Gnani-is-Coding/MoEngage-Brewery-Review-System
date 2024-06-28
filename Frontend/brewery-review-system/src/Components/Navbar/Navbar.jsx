import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

function Navbar() {
  const navigate = useNavigate()

  const jwtToken = Cookies.get("jwt_token")
  const onClickLogout = () => {
    Cookies.remove("jwt_token")
    navigate("/login")
  }

  return (
    <div className='navbar-container'>
      <nav className='navbar'>
        <Link to="/" style={{textDecoration: 'none'}}>
          <h1 className='navbar-heading'>Brewery Reviews</h1>
          </Link>

          {jwtToken !== undefined && <div className='logout-btn' onClick={onClickLogout}>Logout</div>}
          
      </nav>  
    </div>
    
  )
}

export default Navbar
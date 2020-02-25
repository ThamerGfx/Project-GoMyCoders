import React from 'react'
import { Link } from 'react-router-dom'
//components
import SignedInLinks from './SignedInLinks'
import logo from './GoMyCode.png'

const Navbar = () => {

  return (
    <nav className = "nav-wrapper grey" style = {{marginBottom : '15px'}}>
      <div className = "container">
        <Link 
          to = '/' 
          className = "brand-logo"
        >
          <img width = {150}src = {logo} alt = "Go My Code Logo"/>
        </Link>
        <SignedInLinks/>
      </div>
    </nav>
  )
}

export default Navbar
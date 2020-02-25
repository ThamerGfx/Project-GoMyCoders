import React from 'react'

import { NavLink } from 'react-router-dom'


const SignedInLinks = () => {

  return (
    <div>
      <ul className="right">
        <li>
          <NavLink 
            to = '/create'  
            className = "btn white lighten-1"
            style = {{marginTop: '15px'}}
          > 
              New Student 
          </NavLink>
        </li>
        <li>
          <NavLink 
            to = '/update' 
            className = "btn white lighten-1" 
            style = {{marginTop: '15px'}}
          > 
            Update & Delete Student 
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default SignedInLinks
import React from 'react'
import { NavLink } from "react-router-dom";

const Navbar = () =>  {
  return (
    <nav className='navbar navbar-light bg-light'>
        <ul className='nav nav-brand'>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/'>Home</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/tasks'>Tasks</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/create-task'>Nueva Tarea</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;
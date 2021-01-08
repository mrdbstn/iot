import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar__container">
                <Link to='/memories'>memories</Link>
                <Link to='/events'>events</Link>
                <Link to='/connect'>connect</Link>
            </div>
        </div>
    )
}

export default Navbar

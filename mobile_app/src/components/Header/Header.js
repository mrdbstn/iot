import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
    const location = useLocation()
    const history = useHistory()

    let pathname = location.pathname.substring(1) ? location.pathname.substring(1) : "Memories"
    let pathnameCap = pathname.charAt(0).toUpperCase() + pathname.slice(1)
    return (
        <div className="header">
            <div onClick={() => {
                history.push('./upload')
            }}className="header__container">
                <button className="header__upload-button">Upload</button>
                <h1 className="header__title">{pathnameCap}</h1>
            </div>
            
        </div>
    )
}

export default Header

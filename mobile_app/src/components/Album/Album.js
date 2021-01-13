import React, { useEffect } from 'react'
import '../Album/album.css'

function Album({ name, func, img, delay }) {
    const array = name.split('-')
    const album = array[1]
    const date = [array[4], '-', array[3], '-', array[2]]
    const calc = delay * 0.12



    return (
        <div style={{animationDelay:`${calc}s`}}onClick={() => func(name)} className="album">
            <img className="album__image" src={img} />
            <h1 className="album__text">{album}</h1>
            <p className="album__text album__subtext">{date}</p>
        </div>
    )
}

export default Album

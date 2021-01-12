import React, { useEffect } from 'react'
import '../Album/album.css'

function Album({ name, func, img }) {
    const album = name

    return (
        <div onClick={() => func(album)} className="album">
            <img className="album__image" src={img} />
            <p className="album__text">{name}</p>
        </div>
    )
}

export default Album

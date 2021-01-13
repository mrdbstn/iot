import Amplify, { Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import awsconfig from '../aws-exports'
import '../AlbumPage/albumpage.css'
Amplify.configure(awsconfig)



function AlbumPage() {

    const [images, setImages] = useState([])
    let location = useLocation()
    const link = location.pathname.split('/')
    const directory = link[2]
    const albumname = directory.split("-")

    async function fetchImages() {
        let list = await Storage.list(directory)
        let images = list.map(f => Storage.get(f.key))

        images = await Promise.all(images)
        setImages(images)

    }

    useEffect(() => {
        fetchImages()
    }, [])

    return (
        <div className='albumpage'>
            <div className="masonry">
                {
                    images.map((f, i) => (
                        <img className='item' key={i} src={f} alt="oi" />
                    ))
                }
            </div>

        </div>
    )
}

export default AlbumPage

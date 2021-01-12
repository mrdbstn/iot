import Amplify, { Storage } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import awsconfig from '../aws-exports'

Amplify.configure(awsconfig)



function AlbumPage() {

    const [images, setImages] = useState([])
    let location = useLocation()
    const link = location.pathname.split('/')
    const directory = link[2]
    console.log(directory)
    const albumname = directory.split("-")

    async function fetchImages() {
        let list = await Storage.list(directory)
        console.log(list)
        let images = list.map(f => Storage.get(f.key))

        images = await Promise.all(images)
        setImages(images)
        console.log(images)

    }

    useEffect(() => {
        fetchImages()
    }, [])

    return (
        <div>
           {
                images.map((f, i) => (
                    <img key={i} src={f} alt="oi" />
                ))   
            }
            
        </div>
    )
}

export default AlbumPage

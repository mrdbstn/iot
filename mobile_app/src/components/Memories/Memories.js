import React, { useEffect, useState } from 'react'
import Amplify, { Storage } from 'aws-amplify'
import awsconfig from '../aws-exports'
import JSZip from 'jszip'
import './Memories.css'
import { S3Image } from 'aws-amplify-react'

Amplify.configure(awsconfig)

function Memories() {

    const [files, setFiles] = useState([])

    async function fetchAlbums() {
        let list = await Storage.list('')
        console.log(list)
        let images = list.map(f => Storage.get(f.key))

        images = await Promise.all(images)
        console.log('images ', images)
        setFiles(images)
        console.log('files ', files)
    }

    useEffect(() => {
        fetchAlbums()
    }, [])



    return (
        
        <div className="memories" style={{ height: "80vh" }}>
           
            {
                files.map((f, i) => (
                    <img key={i} src={f} alt="oi" />
                ))
            }
        </div>
    )
}

export default Memories

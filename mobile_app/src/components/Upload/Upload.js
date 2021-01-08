import React from 'react'
import { MemoriesForm, TestForm } from '../Forms/Forms'
import './Upload.css'


function Upload() {
    return (
        <div className="upload" style={{height:"80vh"}}>
            <div className="upload__container">
                <MemoriesForm />
            </div>
         </div> 
    )
}

export default Upload
 
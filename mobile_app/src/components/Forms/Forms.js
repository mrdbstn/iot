import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import React, { useState, useEffect, useRef } from 'react'
import Amplify, {Storage} from 'aws-amplify'
import awsconfig from '../aws-exports'
import './Forms.css'

Amplify.configure(awsconfig);

export const Thumb = ({ file }) => {

    const [thumb, setThumb] = useState(undefined)
    const isFirstRun = useRef(true)
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        let reader = new FileReader();
        reader.onloadend = () => {
            setThumb(reader.result)
        }
        reader.readAsDataURL(file)

    }, [file])

    return (
        <img
            src={thumb}
            alt=''
            height={200}
            width={200} />
    )
}


export const MemoriesForm = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    date: '',
                    pictures: [{
                        file: undefined
                    }]
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name || !values.date || !values.pictures) {
                        errors.name = 'Required';
                        errors.date = 'Required';
                        errors.pictures = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {

                    let data = new FormData()
                    values.pictures.map((picture, index) => {
                        data.append(`album-${values.name}-${values.date}/file_${index}`, picture.file)
                    })
                    data.append('name', values.name)
                    
                    for (let [key, file] of data.entries()) {
                        if (key.includes('file')) {
                           Storage.put(key, file, {
                               contentType: "image/png"
                           })
                           .then(result => console.log(result))
                           .catch(err => console.log(err))
                        }   
                    }

                    actions.setSubmitting(false);
                }}>
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                        <label htmlFor="name">Name: </label> <br />
                        <Field type="name" name="name" />
                        <ErrorMessage name="name" component="div" />
                        <label htmlFor="date">Date: </label> <br />
                        <Field type="date" name="date" /> <br />
                        <ErrorMessage name="date" component="div" />
                        <FieldArray name='pictures'>
                            {({ insert, remove, push }) => (

                                <div>
                                    {values.pictures.length > 0 &&
                                        values.pictures.map((picture, index) => (
                                            <div className="row" key={index}>
                                                <div className="col">
                                                    <label htmlFor={`pictures.${index}.name`}>Picture</label>
                                                    <Field
                                                        name={`pictures.${index}.name`}
                                                        type='file'
                                                        onChange={event => {
                                                            setFieldValue(`pictures.${index}.file`, event.currentTarget.files[0])
                                                        }}
                                                    />
                                                    <Thumb file={picture.file} />
                                                    <ErrorMessage name={`pictures.${index}.name`} component="div" />
                                                </div>
                                                <div className="col">
                                                    <button
                                                        type='button'
                                                        className="secondary"
                                                        onClick={() => remove(index)}>
                                                        X
                                                        </button>
                                                </div>
                                            </div>
                                        ))}
                                    <button
                                        type='button'
                                        className="secondary"
                                        onClick={() => push({ file: undefined })}>Add picture</button>
                                </div>
                            )}
                        </FieldArray>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


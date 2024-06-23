import React, { useState, useEffect } from 'react'

const Cast = (props) => {
    const [image, setImage] = useState('')

    useEffect(() => {
        setImage('https://image.tmdb.org/t/p/original')
    }, [])

    return (
        <>
            <div classNameclass="cards" key={props.index} >
                <figure className="card">
                    <img src={image + props.poster} alt=''/>
                    {/* <figcaption>{props.judul}</figcaption> */}
                </figure>
                <div className="ml-2" style={{ color: 'black' }}>
                    <h6><strong>{props.character}</strong></h6>
                    <p >{props.judul}</p>
                </div>

            </div>
        </>
    )
}

export default Cast
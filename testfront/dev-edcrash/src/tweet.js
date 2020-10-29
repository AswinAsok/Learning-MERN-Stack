import React from 'react'


function Tweet({name, message}) {
    return(
        <div className='tweet'>
            <h3>{name}</h3>
            <p>{message}</p>
            <h3>No of likes</h3>
        </div>
    )
}

export default Tweet;
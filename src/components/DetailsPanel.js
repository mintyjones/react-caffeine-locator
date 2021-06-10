import React from 'react'

const DetailsPanel = ({ placeDetails }) => {
    console.log(placeDetails)
    return (
        <div className="absolute top-0 right-0 z-10 bg-white p-2">
            <h1>{placeDetails.name}</h1>
            <img width={500}src={placeDetails.photos[0].getUrl()}></img>
        </div>
    )
}

export default DetailsPanel

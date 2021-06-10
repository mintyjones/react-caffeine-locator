import React from 'react'
import PlaceTile from './PlaceTile'

const PlacesPanel = ({ places, getPlaceDetails }) => {

    const renderPlaces = (places) => {
        console.log(places)
        return places.map((placeObj, index) => {
            return <PlaceTile 
                key={index}
                placeObj={placeObj}
                getPlaceDetails={getPlaceDetails}
            />
        })
    }

    return (
        <div className="overflow-scroll h-screen">
            { places.length > 1 ? renderPlaces(places) : <h1>Loading...</h1>}
        </div>
    )
}

export default PlacesPanel

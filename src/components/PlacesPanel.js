import React from 'react'
import PlaceTile from './PlaceTile'

const PlacesPanel = ({ places }) => {

    const renderPlaces = (places) => {
        return places.map((placeObj, index) => {
            return <PlaceTile 
                key={index}
                placeObj={placeObj}
            />
        })
    }

    return (
        <div>
            { places.length > 1 ? renderPlaces(places) : null}
        </div>
    )
}

export default PlacesPanel

import React from 'react'
import PlaceTile from './PlaceTile'

const PlacesPanel = ({ places, getPlaceDetails }) => {

    const renderPlaces = (places) => {
        const sortedPlaces = places.sort((place1, place2) => {
             return place1.rating > place2.rating ? -1 : 1
        })
        return sortedPlaces.map((placeObj, index) => {
            return <PlaceTile 
                key={index}
                placeObj={placeObj}
                getPlaceDetails={getPlaceDetails}
            />
        })
    }

    return (
        <div className="w-3/12 overflow-scroll h-screen">
            { places.length > 1 ? renderPlaces(places) : <h1>Loading...</h1>}
        </div>
    )
}

export default PlacesPanel

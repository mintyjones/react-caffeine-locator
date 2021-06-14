import React from 'react'
import PlaceTile from './PlaceTile'

import PlacesPanelLoading from './PlacesPanelLoading';
import Attributions from './Attributions';

const PlacesPanel = ({ places, getPlaceDetails, map, handleMarkerClick }) => {

    const renderPlaces = (places) => {
        const sortedPlaces = places.sort((place1, place2) => {
             return place1.rating > place2.rating ? -1 : 1
        })
        return sortedPlaces.map((placeObj, index) => {
            return <PlaceTile 
                key={index}
                placeObj={placeObj}
                getPlaceDetails={getPlaceDetails}
                map={map}
                handleMarkerClick={handleMarkerClick}
            />
        })
    }

    return (
        <div className="w-3/12 h-screen bg-highlightMid">
            <div className="overflow-y-scroll overflow-x-hidden h-5/6">
                { places.length > 1 ? renderPlaces(places) 
                : 
                <PlacesPanelLoading></PlacesPanelLoading>
                }
            </div>
            <Attributions></Attributions>
        </div>
        
        
    )
}

export default PlacesPanel

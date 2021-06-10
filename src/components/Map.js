import React, { useCallback, useMemo } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '100%'
};

const libraries = ['places']

const Map = ({ userCoords, setPlaces }) => {
    const request = useMemo(() => {
        return {
        location: userCoords,
        radius: '5000',
        type: ['cafe']
    }}, [userCoords])
    // Callback function to be fired after the map has loaded
    const onMapLoad = (map) => {
        
        const service = new window.google.maps.places.PlacesService(map)
        service.nearbySearch(request, (placesArr) => setPlaces(placesArr))
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAPFl51bdExluvRDHFggZ_TTDv9xfUpUwc",
        libraries
        })

    return (
        
        isLoaded && <GoogleMap 
            mapContainerStyle={containerStyle}
            zoom={14}
            center={userCoords}
            onLoad={onMapLoad}
        
        /> 
    )
}

export default Map
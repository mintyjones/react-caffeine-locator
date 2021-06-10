
import React, {useRef, useCallback, useMemo} from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Locate from "./Locate"

const containerStyle = {
  width: '100%',
  height: '100%'
};

const libraries = ['places']

const Map = ({ userCoords, setPlaces, setMap }) => {
    const request = useMemo(() => {
        return {
        location: userCoords,
        radius: '5000',
        type: ['cafe']
    }}, [userCoords])

    const mapRef = useRef()
    const onMapLoad = useCallback(
        (mapInstance) => {
            mapRef.current = mapInstance
            const service = new window.google.maps.places.PlacesService(mapInstance)
            setMap(mapInstance)
            service.nearbySearch(request, (placesArr) => setPlaces(placesArr))
        },
    )

    const panTo = useCallback(({lat,lng}) => {
        mapRef.current.panTo({lat,lng})
        mapRef.current.setZoom(14)
    })
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
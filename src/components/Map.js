
import React, {useRef, useCallback, useMemo, memo} from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Locate from "./Locate"
import mapStyles from "../utils/mapStyles"

const containerStyle = {
  width: '100%',
  height: '100%'
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true
  }

const libraries = ['places']

const Map = ({ userCoords, setPlaces, places, handleMarkerClick, setMap }) => {
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
        }, [request, setPlaces])

        const panTo = useCallback(({lat,lng}) => {
            mapRef.current.panTo({lat,lng})
            mapRef.current.setZoom(14)
        }, [])

        const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAPFl51bdExluvRDHFggZ_TTDv9xfUpUwc",
        libraries
        })

        const renderMarkers = (places) => {
            console.log("RenderMarkers:", places)
            return places.map((placeObj) => {
              return <Marker 
                key={placeObj.place_id}
                position={placeObj.geometry.location} 
                onClick={() => handleMarkerClick(placeObj, mapRef)}
                icon={{
                    url: '/ccup.svg',
                    scaledSize: new window.google.maps.Size(50,50),
                    origin: new window.google.maps.Point(0,0),
                    anchor: new window.google.maps.Point(25,25)
                }}
              />
            })
          }

    return (
        
        isLoaded && 
        <>
        <Locate panTo={panTo}/>
        <GoogleMap 
            mapContainerStyle={containerStyle}
            zoom={14}
            center={userCoords}
            onLoad={onMapLoad}
            options={options}
        > 
        {places ? renderMarkers(places) : null} 
        </GoogleMap>
        </>
    )
}
        
export default memo(Map)
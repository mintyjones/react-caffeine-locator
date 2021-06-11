import React, {useRef, useCallback, useMemo, memo} from 'react'
import { 
    GoogleMap, 
    useLoadScript, 
    Marker, 
    InfoWindow
} from '@react-google-maps/api';
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

const Map = ({ map, userCoords, setPlaces, places, handleMarkerClick, setMap, selectedMarker }) => {
    // const request = useMemo(() => {
    //     return {
    //     location: userCoords,
    //     radius: '5000',
    //     type: ['cafe']
    // }}, [userCoords])

    const mapRef = useRef()
    const placeSearchOnCenter = useCallback(
        (mapInstance) => {
            mapRef.current = mapInstance
            const service = new window.google.maps.places.PlacesService(mapInstance)
            setMap(mapInstance)
            const mapCenter = {lat: mapInstance.center.lat(), lng: mapInstance.center.lng()}
            service.nearbySearch({
                location: mapCenter,
                radius: '5000',
                type: ['cafe']
            }, (placesArr) => setPlaces(placesArr))
        }, [setPlaces]
    )

    const panTo = useCallback(({lat,lng}) => {
        mapRef.current.panTo({lat,lng})
        mapRef.current.setZoom(14)
    }, [])

    const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPFl51bdExluvRDHFggZ_TTDv9xfUpUwc",
    libraries
    })

    const renderMarkers = () => {
        return places.map((placeObj) => {
        console.log("RenderMarkers:", placeObj.geometry.location)
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

    const renderInfoWindow = () => {
        return (
            <InfoWindow 
                position={selectedMarker.geometry.location}
                onCloseClick = {() => handleMarkerClick(null)}
            >
                <div>
                    <h2>GET YER COFFEE HERE!</h2>
                    <p>{selectedMarker.name}</p>
                    <p>{selectedMarker.vicinity}</p>
                </div>
            </InfoWindow>
        )
    }

    return (
        
        isLoaded && 
        <>
        <Locate panTo={panTo}/>
        <GoogleMap 
            mapContainerStyle={containerStyle}
            zoom={15.5}
            center={userCoords}
            // change below to placeSearchOnCenter
            onLoad={placeSearchOnCenter}
            options={options}
            onClick={(e)=> handleMarkerClick(null)}
            onDragEnd={()=>placeSearchOnCenter(map)}
            // onDragEnd={()=>console.log(map.center.lat(), map.center.lng())}
        > 
        <Marker
            position={userCoords}
            icon={{
                url: '/YouAreHere.svg',
                scaledSize: new window.google.maps.Size(50,50),
                origin: new window.google.maps.Point(0,0),
                anchor: new window.google.maps.Point(25,25)
            }}
        />
        {places ? renderMarkers() : null} 
        {selectedMarker ? renderInfoWindow() : null}
        </GoogleMap>
        </>
    )
}
        
export default memo(Map)
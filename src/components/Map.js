import React, {useRef, useCallback, useMemo, memo} from 'react'
import { 
    GoogleMap, 
    useLoadScript, 
    Marker, 
    InfoWindow,
    InfoBox
} from '@react-google-maps/api';
import Locate from "./Locate"
import mapStyles from "../utils/mapStyles"
import { Rating } from '@material-ui/lab'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const containerStyle = {
  width: '100%',
  height: '100%'
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true
  }

const libraries = ['places']

const Map = ({ map, userCoords, setPlaces, places, handleMarkerClick, setMap, selectedMarker, placeDetails }) => {
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
            console.log("running replace")
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
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries
    })

    const renderMarkers = () => {
        return places.map((placeObj) => {
        // console.log("RenderMarkers:", placeObj.geometry.location)
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

    const infoBoxOptions = { closeBoxURL: '', alignBottom: true, pixelOffset: new window.google.maps.Size(-140, -8)}

    const renderInfoWindow = () => {
        const placeRating = placeDetails.rating
        return (
            <InfoBox 
                position={selectedMarker.geometry.location}
                onCloseClick = {() => handleMarkerClick(null)}
                options={infoBoxOptions}

            >
                <div className="infoBox p-3 rounded-lg bg-highlightHigh w-full">
                  <div className="flex justify-between">
                    <p className="text-lg">{selectedMarker.name}</p>
                    <HighlightOffIcon style={{ fontSize: "30", cursor: "pointer" }}onClick={()=>handleMarkerClick(null)}></HighlightOffIcon>
                  </div>
                    <p>{selectedMarker.vicinity}</p>
                    {/* {console.log("place details:", placeRating)} */}
                    {/* <Rating 
                        name="stars"
                        value={placeRating}
                        readOnly
                        precision={0.1}
                    /> */}
                </div>
            </InfoBox>
        )
    }

    return (
        
        isLoaded && 
        <>
        <Locate panTo={panTo} placeSearchOnCenter={placeSearchOnCenter} map={map} setMap={setMap}/>
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
        {selectedMarker && placeDetails ? renderInfoWindow() : null}
        </GoogleMap>
        </>
    )
}
        
export default memo(Map)
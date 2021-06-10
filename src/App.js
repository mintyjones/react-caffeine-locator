import React, { useEffect, useReducer } from 'react'
import reducer from './utils/reducer'
import Map from './components/Map'
import PlacesPanel from './components/PlacesPanel'
import DetailsPanel from './components/DetailsPanel'

export default function App() {
  const initialState = {
    userCoords: {},
    userLocated: false,
    places: [],
    placeSelected: false,
    placeDetails: {},
    map: null,
    selectedMarker: null
  }

  const [store, dispatch] = useReducer(reducer, initialState)
  const { userCoords, userLocated, places, map, placeDetails, placeSelected, selectedMarker } = store

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const lat = res.coords.latitude
      const lng = res.coords.longitude
      dispatch({ type: "setUserCoords", data: { lat, lng }})
    })  
  }, [])
  
  const setPlaces = (placesArr) => {
    dispatch({ type: "setPlaces", data: placesArr})
  }
  function handleMarkerClick(place, map) {
    if (arguments.length === 2) {
      map.current.setZoom(16)
      map.current.panTo(place.geometry.location)
    }
    if (place) {
      dispatch({
        type: "setMarker",
        data: place
      }) 
    } else {
      dispatch({
        type: "setMarker",
        data: null
      }) 
    }
  }
  const setPlaceDetails = (placeDetails) => {
    dispatch({ type: "setPlaceDetails", data: placeDetails })
  }
  const getPlaceDetails = (placeId) => {
    const service = new window.google.maps.places.PlacesService(map)
    const request = {
      placeId,
      fields: ['photo','opening_hours','business_status', 'name', 'rating']
    }
    service.getDetails(request, setPlaceDetails)
  }
  
  const setMap = (mapInstance) => {
    dispatch({ type: "setMap", data: mapInstance})
  }
  const removeSelectedPlace = () => dispatch({ type: "removeSelectedPlace" })

  return (
    <div className="flex">
      <div className="w-9/12 h-screen z-0 relative">
        { userLocated ? 
          <Map 
            userCoords={userCoords} 
            setPlaces={setPlaces} 
            places={places} 
            setMap={setMap} 
            handleMarkerClick={handleMarkerClick}
            selectedMarker={selectedMarker}
          /> 
        : 
          null 
        }
        { placeSelected ? 
          <DetailsPanel 
            placeDetails={placeDetails} 
            removeSelectedPlace={removeSelectedPlace} 
          /> 
        : 
          null 
        }
      </div>
      
      <PlacesPanel places={places} getPlaceDetails={getPlaceDetails}></PlacesPanel>
      
    </div>
  )
}

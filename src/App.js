import React, { useEffect, useReducer } from 'react'
import reducer from './utils/reducer'
import Map from './components/Map'
import PlacesPanel from './components/PlacesPanel'
import DetailsPanel from './components/DetailsPanel'
import RequestAccess from './components/RequestAccess'

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
    }, () => null, {enableHighAccuracy: true})  
  }, [])
  
  const setPlaces = (placesArr) => {
    dispatch({ type: "setPlaces", data: placesArr})
  }
  function handleMarkerClick(place, map) {
    if (arguments.length === 2) {
      map.current.setZoom(16)
      const adjustedLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()+0.004
      }
      map.current.panTo(adjustedLng)
      getPlaceDetails(place.place_id)
      console.log("The place location:", place.geometry.location)
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
    <div className="flex text-textMain">
      <div className="w-9/12 h-screen z-0 relative">
        { userLocated ? 
          <Map 
            userCoords={userCoords} 
            setPlaces={setPlaces} 
            places={places} 
            setMap={setMap} 
            handleMarkerClick={handleMarkerClick}
            selectedMarker={selectedMarker}
            map={map}
            placeDetails={placeDetails}
          /> 
        : 
          <RequestAccess /> 
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
      { userLocated ?
        <PlacesPanel places={places} getPlaceDetails={getPlaceDetails} map={map} handleMarkerClick={handleMarkerClick}></PlacesPanel>
      :
        null 
      }
    </div>
  )
}

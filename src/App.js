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
    map: null
  }

  const [store, dispatch] = useReducer(reducer, initialState)
  const { userCoords, userLocated, places, map, placeDetails, placeSelected } = store

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
  return (
    <div className="flex">
      <div className="w-9/12 h-screen z-0 relative">
        { userLocated ? <Map userCoords={userCoords} setPlaces={setPlaces} setMap={setMap}></Map> : null }
        { placeSelected ? <DetailsPanel placeDetails={placeDetails}></DetailsPanel> : null }
      </div>
      
      <PlacesPanel places={places} getPlaceDetails={getPlaceDetails}></PlacesPanel>
      
    </div>
  )
}

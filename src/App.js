import React, { useEffect, useReducer } from 'react'
import reducer from './utils/reducer'
import Map from './components/Map'
import PlacesPanel from './components/PlacesPanel'

export default function App() {
  const initialState = {
    userCoords: {},
    userLocated: false,
    places: [],
    selectedMarker: null
  }

  const [store, dispatch] = useReducer(reducer, initialState)
  const { userCoords, userLocated, places } = store

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
    map.current.setZoom(16)
    map.current.panTo(place.geometry.location)
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
  console.log(places)
  return (
    <div className="flex">
      <div className="w-9/12 h-screen">
        { userLocated ? 
          <Map 
            userCoords={userCoords} 
            setPlaces={setPlaces} 
            places={places} 
            handleMarkerClick={handleMarkerClick}>
          </Map>
          : 
          null 
        }
      </div>
      
      <PlacesPanel places={places}></PlacesPanel>
    </div>
  )
}

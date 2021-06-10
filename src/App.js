import React, { useEffect, useReducer } from 'react'
import reducer from './utils/reducer'
import Map from './components/Map'
import PlacesPanel from './components/PlacesPanel'

export default function App() {
  const initialState = {
    userCoords: {},
    userLocated: false,
    places: []
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
  console.log(places)
  return (
    <div className="flex">
      <div className="w-9/12 h-screen">
        { userLocated ? <Map userCoords={userCoords} setPlaces={setPlaces}></Map> : null }
      </div>
      
      <PlacesPanel places={places}></PlacesPanel>
    </div>
  )
}

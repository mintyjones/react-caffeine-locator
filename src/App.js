import React, { useEffect, useReducer } from 'react'
import reducer from './utils/reducer'
import Map from './components/Map'

export default function App() {
  const initialState = {
    userCoords: {},
    userLocated: false
  }
  const [store, dispatch] = useReducer(reducer, initialState)
  const { userCoords, userLocated } = store

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const lat = res.coords.latitude
      const lng = res.coords.longitude
      dispatch({ type: "setUserCoords", data: { lat, lng }})
    })  
  }, [])
  
  return (
    <div className='flex'>
      <div className='w-9/12 h-screen'>
      { userLocated ? <Map userCoords={userCoords}></Map> : null }
      </div>
    </div>
  )
}

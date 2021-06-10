import React, { useEffect, useReducer } from 'react'
import reducer from './utils/reducer'

export default function App() {
  const initialState = {
    userCoords: {}
  }
  const [store, dispatch] = useReducer(initialState, reducer)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const userCoords = res.coords

    })  
  }, [])
  
  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}

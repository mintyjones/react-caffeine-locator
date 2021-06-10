import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '400px',
  height: '400px'
};


const Map = ({ userCoords }) => {
    console.log(process.env.REACT_APP_GOOGLE_API_KEY)
  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyAPFl51bdExluvRDHFggZ_TTDv9xfUpUwc"}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userCoords}
        zoom={10}
      >
        
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
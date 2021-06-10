import React, {useRef, useCallback} from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
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

const Map = ({ userCoords }) => {
    console.log(process.env.REACT_APP_GOOGLE_API_KEY)

    const mapRef = useRef()
    const onMapLoad = useCallback(
        (map) => {
            mapRef.current = map
        },
    )

    const panTo = useCallback(({lat,lng}) => {
        mapRef.current.panTo({lat,lng})
        mapRef.current.setZoom(14)
    })

  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyAPFl51bdExluvRDHFggZ_TTDv9xfUpUwc"}
    >
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userCoords}
        zoom={10}
        options={options}
      >
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
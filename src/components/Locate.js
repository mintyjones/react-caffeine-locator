import React from 'react'

const Locate = ({panTo, placeSearchOnCenter, map, setMap}) => {
    return (
        <div>
            <button className='locate' onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position)
                    panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }, () => null, {enableHighAccuracy: true})
                    placeSearchOnCenter(map)
                })
            }}
            >
                <img src="compass.svg" alt="compass" />
            </button>
        </div>
    )
}

export default Locate

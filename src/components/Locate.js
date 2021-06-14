import React from 'react'

const Locate = ({panTo, placeSearchOnCenter, map, setMap}) => {
    return (
        <div>
            <button className='absolute top-3 left-4 z-10' onClick={() => {
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
                <img className="w-10" src="compass.svg" alt="compass" />
            </button>
        </div>
    )
}

export default Locate

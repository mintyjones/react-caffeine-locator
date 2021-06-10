import React from 'react'

const Locate = ({panTo}) => {
    return (
        <div>
            <button className='locate' onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position)
                    panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }, () => null, {enableHighAccuracy: true})
                })
            }}
            >
                <img src="compass.svg" alt="compass" />
            </button>
        </div>
    )
}

export default Locate

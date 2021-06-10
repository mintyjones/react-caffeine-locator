import React from 'react'
import { Rating } from '@material-ui/lab';
import { Paper, Button } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

const DetailsPanel = ({ placeDetails, removeSelectedPlace }) => {
    console.log(placeDetails)
    return (
        <div className="absolute top-0 right-0 z-10 bg-white p-2 w-5/12 max-w-lg">
            <div className="flex justify-between">
                <h1 className="text-2xl">{placeDetails.name}</h1>
                <button className="text-2xl px-2 bg-gray-200" onClick={removeSelectedPlace}>X</button>
            </div>
            <Rating 
                name="stars"
                value={placeDetails.rating}
                readOnly
                precision={0.1}
            />
            { placeDetails.opening_hours ?
                <ul>
                    {placeDetails.opening_hours.weekday_text.map((string, index) => {
                        return <li key={index}>{string}</li>
                    })}
                </ul>
            :
                null

            }
            <div className="max-w-full">
                <Carousel>
                    {placeDetails.photos.map((photo) => {
                     return <img src={photo.getUrl()}></img>
                    })}
                </Carousel>  
            </div>
            
           
        </div>
    )
}

export default DetailsPanel

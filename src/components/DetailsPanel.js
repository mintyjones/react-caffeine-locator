import React from 'react'
import { Rating } from '@material-ui/lab';

const DetailsPanel = ({ placeDetails, removeSelectedPlace }) => {
    console.log(placeDetails)
    return (
        <div className="absolute top-0 right-0 z-10 bg-white p-2">
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
            
            <img width={300}src={placeDetails.photos[0].getUrl()}></img>
        </div>
    )
}

export default DetailsPanel

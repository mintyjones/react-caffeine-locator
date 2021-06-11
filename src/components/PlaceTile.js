import React from 'react'
import { Rating } from '@material-ui/lab';

const PlaceTile = ({ placeObj, getPlaceDetails }) => {

    return (
        <div className="my-4 mx-2 rounded bg-highlightHigh px-2 py-1 shadow">
            <div className="">
                <h1 className="text-2xl">{placeObj.name}</h1>
                
                <div className="flex justify-between items-center">
                    <Rating 
                    name="stars"
                    value={placeObj.rating}
                    readOnly
                    precision={0.1}
                    />
                <button 
                    className=" p-2 border-2 border-black rounded"
                    onClick={() => getPlaceDetails(placeObj.place_id)}
                > 
                    More Details
                </button>
                </div>
                
            </div>
            
        </div>
    )
}

export default PlaceTile

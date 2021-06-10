import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import { Rating } from '@material-ui/lab';

const PlaceTile = ({ placeObj, getPlaceDetails }) => {

    return (
        <div className="border-b-2">
            <div className="p-2">
                <h1 className="text-2xl">{placeObj.name}</h1>
                
                <Rating 
                    name="stars"
                    value={placeObj.rating}
                    readOnly
                    precision={0.1}
                />
                <button 
                    className=" p-2 border-2 border-black rounded"
                    onClick={() => getPlaceDetails(placeObj.place_id)}
                > More Details</button>
            </div>
            
        </div>
    )
}

export default PlaceTile

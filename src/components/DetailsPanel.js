import React from 'react'
import { Rating } from '@material-ui/lab';
import { Paper, Button } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const DetailsPanel = ({ placeDetails, removeSelectedPlace }) => {
    console.log(placeDetails)

    const filterImages = () => {

        return placeDetails.photos.filter(photoObj => {
            if(photoObj.height < photoObj.width){
                // pre-load the images
                const picture = new Image
                picture.src = photoObj.getUrl()
                return true
            } 
            return false
        })
    }
    
    return (
        <div className="absolute top-1 right-1 z-10 bg-white p-2 w-5/12 max-w-lg rounded-lg">
            <div className="flex justify-between">
                <h1 className="text-2xl">{placeDetails.name}</h1>
                <HighlightOffIcon style={{ fontSize: "40", cursor: "pointer" }}onClick={removeSelectedPlace}></HighlightOffIcon>
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
                    {filterImages().map((photo) => {
                        return <img src={photo.getUrl()}></img>
                    })}
                </Carousel>  
            </div>
            
           
        </div>
    )
}

export default DetailsPanel

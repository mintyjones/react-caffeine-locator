import React from 'react'
import { Rating } from '@material-ui/lab';
import { Paper, Button } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const DetailsPanel = ({ placeDetails, removeSelectedPlace }) => {
    console.log(placeDetails)

    const filterImages = () => {

        return (
          placeDetails.photos &&
          placeDetails.photos.filter(photoObj => {
            if(photoObj.height < photoObj.width){
                // pre-load the images
                const picture = new Image
                picture.src = photoObj.getUrl()
                return true
            } 
            return false
          })
        )
    }
    
    return (
        <div className="absolute top-2 right-2 z-10 bg-white p-4 w-4/12 max-w-lg rounded-lg bg-highlightMid">
            <div className="flex justify-between mb-1">
                <h1 className="text-3xl">{placeDetails.name}</h1>
                <HighlightOffIcon style={{ fontSize: "40", cursor: "pointer" }}onClick={removeSelectedPlace}></HighlightOffIcon>
            </div>
            <Rating 
                name="stars"
                value={placeDetails.rating}
                readOnly
                precision={0.1}
            />
            { placeDetails.opening_hours ?
                <ul className="p-2 bg-highlightHigh rounded-lg mb-4 mt-2">
                    {placeDetails.opening_hours.weekday_text.map((string, index) => {
                        return <li key={index}>{string}</li>
                    })}
                </ul>
            :
                null

            }
            { placeDetails.photos &&
              <div className="max-w-full">
                  <Carousel animation={"slide"}>
                      {filterImages().map((photo) => {
                          return <img src={photo.getUrl()} ></img>
                      })}
                  </Carousel>  
              </div>
            }
            
           
        </div>
    )
}

export default DetailsPanel

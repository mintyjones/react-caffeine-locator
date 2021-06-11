import React from 'react'
import PlaceTile from './PlaceTile'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const PlacesPanel = ({ places, getPlaceDetails }) => {

    const renderPlaces = (places) => {
        const sortedPlaces = places.sort((place1, place2) => {
             return place1.rating > place2.rating ? -1 : 1
        })
        return sortedPlaces.map((placeObj, index) => {
            return <PlaceTile 
                key={index}
                placeObj={placeObj}
                getPlaceDetails={getPlaceDetails}
            />
        })
    }

    return (
        <div className="w-3/12 h-screen">
            <div className="overflow-y-auto h-5/6">
                { places.length > 1 ? renderPlaces(places) : <h1>Loading...</h1>}
            </div>
            <div className="flex justify-evenly">
                <div>
                    <h3 className="text-lg">Gordon Campbell</h3>
                    <div className=" flex justify-evenly">
                        <a href="https://github.com/mintyjones">
                            <GitHubIcon style={{ fontSize: "35"}}></GitHubIcon>
                        </a>
                        <a href="https://www.linkedin.com/in/gordon-campbell-3250439/">
                            <LinkedInIcon style={{ fontSize: "45"}}></LinkedInIcon>
                        </a>
                    </div>
                </div>
                
                
                <div>
                    <h3 className="text-lg">Anthony Carroll</h3>
                    <div className="flex justify-evenly">
                        <a href="https://github.com/AnthonyCarroll97">
                            <GitHubIcon style={{ fontSize: "35"}}></GitHubIcon>
                        </a>
                        <a href="https://www.linkedin.com/in/anthony-carroll-3130661bb/">
                            <LinkedInIcon style={{ fontSize: "45"}}></LinkedInIcon>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}

export default PlacesPanel

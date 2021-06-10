const reducer = (state, action) => {
    switch(action.type){
        case("setUserCoords") : 
            return {
                ...state,
                userCoords: action.data,
                userLocated: true
            }
        case("setPlaces") : 
            return {
                ...state,
                places: action.data
            }
        case("setMap") :
            return {
                ...state,
                map: action.data
            }
        case("setPlaceDetails") :
            return {
                ...state,
                placeDetails: action.data,
                placeSelected: true
            }
        case("setMarker") : 
            return {
                ...state,
                selectedMarker: action.data
            }
        default : return state
    }
}

export default reducer
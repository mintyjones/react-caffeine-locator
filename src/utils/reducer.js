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
        default : return state
    }
}

export default reducer
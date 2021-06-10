const reducer = (state, action) => {
    switch(action.type){
        case("setUserCoords") : 
            return {
                ...state,
                userCoords: action.data,
                userLocated: true
            }
        default : return state
    }
}

export default reducer
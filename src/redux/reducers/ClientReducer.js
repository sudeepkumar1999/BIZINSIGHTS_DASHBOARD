import * as types from '../actions/types'

let initialState = {
    clientDTO: {},
    clientGateway: {},
    deprecated:''
}
export const client = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_CLIENT_DETAILS_SUCCESS:
            console.log( " gate way  hfhf  dto "+ action.payload);
            return {
                ...state,
                clientDTO: action.payload
            }
        case types.SET_CLIENT_GATEWAY:
             console.log( " gate way  hfhf  URL"+action.payload);
            return {
                ...state,
                clientGateway: action.payload
            }
        case types.CLEAR_CLIENT:
            console.log("clear client")
            return {
                ...state, initialState
               
            }
        default: return state;
    }
}
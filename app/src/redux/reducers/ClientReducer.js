import * as types from '../actions/types'

let initialState = {
    clientDTO: {},
    clientGateway: {},
    deprecated:'',
    securityCode:null
}
export const client = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_CLIENT_DETAILS_SUCCESS:
            
            return {
                ...state,
                clientDTO: action.payload
            }
        case types.SET_CLIENT_GATEWAY:
            
            return {
                ...state,
                clientGateway: action.payload
            }
        case types.SET_SECURITY_CODE:
            return {
                ...state,
                securityCode:action.payload
              };
        case types.SET_DEPRECATED:
            return{
                ...state, deprecated:action.payload
            }
                
        case types.CLEAR_CLIENT:
           
            return {
                ...state, initialState
               
            }
        default: return state;
    }
}
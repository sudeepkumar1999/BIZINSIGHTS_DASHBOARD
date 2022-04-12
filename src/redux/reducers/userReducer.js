import * as types from '../actions/types'


let initialState = {
    clientAppuserId:{},
    clientAppId:{},
    clientAppUserDTO:{},
    clientAppUserLoginDTO:{},
    loginId:null,
    deviceGUID:{},
    isChecked:false,
    hideSecurityCode:false
   


}
export const user = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTHENTICATE_CLIENT_DETAILS_SUCCESS:
           
            return {
                ...state,
                clientAppuserId:action.payload
            }
        case types.SET_LOGIN_ID:
            return {
                
                    ...state, loginId:action.payload
                
            }

        case types.FETCH_CLIENT_APP_DETAILS_SUCCESS:
            console.log("client app id "+action.payload)
            return {
                ...state,
                clientAppId:action.payload
            } 
        case types.REGISTER_CLIENT_DETAILS_SUCCESS:
            console.log("register app id "+action.payload)
            return{
                ...state, clientAppUserDTO:action.payload
            }

            case types.LOGIN_CLIENT_DETAILS_SUCCESS:
                console.log("login app id "+action.payload)
                return{
                    ...state, clientAppUserLoginDTO:action.payload, isChecked:true
                }
                case types.SET_GUID:
                   
                    
                    return {
                        
                            ...state, deviceGUID:action.payload
                        
                    }
                case types.SET_SECURITY_CODE:
                    return  {
                        ...state, hideSecurityCode:action.payload
                    }
                case types.SET_CHECKED:
                    return {
                        ...state, isChecked:action.payload
                    }

                case types.SIGN_OUT_USER_SUCESS:
                    console.log(" sign out")
            
                    return{
                            ...state
                    }

            
            
        
        default: return state;
    }
}

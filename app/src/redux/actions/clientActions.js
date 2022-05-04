
import {Linking, Alert, BackHandler} from 'react-native'
import * as types from './types'
//import * as types from './types'
import ServiceHandler from '../../services/APIHandler'
import * as Constants from '../../constants'
//import * as GenericMethods from '../../common'
//import { ClientDTO } from '../lib/model/ClientDTO'
//import PackageJson from '../../../package.json'
import  AsyncStorageHanlder from '../../services/AsyncStorageHanlder'
import {ClientAppVersionMappingDTO} from '../../models/clientDTO'
import { ParafaitServer } from '../../constants/ParafaitServer'
import {generateDate,generateHashCode} from '../../utilitis'
//import { store } from '../../../index'
import  {authenticateUser} from  './userActions'


var asyncStorageHandler = new AsyncStorageHanlder();



export const getClientDetail=(userId, password, securitycode)=>
{
    return (dispatch, getState) => {
    // console.log("security code"+ securitycode)

    var securityCode=securitycode.slice(-2);
    // console.log("security code"+ securityCode)
    // console.log("securitycode w/o slice", securitycode)

    const currenntTime=generateDate();
    const hashedVal=generateHashCode(Constants.APP_ID,securitycode,currenntTime)
    
        dispatch({ type: types.FETCH_CLIENT_DETAILS_REQUEST });
        //console.log("app id \n version \n securityCode\n  currentTime \n",Constants.APP_ID, Constants.PACKAGE_VERSION, securitycode, currenntTime)
        //ServiceHandler.get({ url: "/api/ClientApp/ClientAppVersion", data: { queryParameters: { appId: Constants.APP_ID, buildNumber : Constants.PACKAGE_VERSION, codeHash:hashedVal, generatedTime:currenntTime} }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
        ServiceHandler.post({
            url: "api/ClientApp/ClientAppVersion",
            headers: { queryParameters: { appId: Constants.APP_ID, buildNumber : Constants.PACKAGE_VERSION,  generatedTime:currenntTime, securityCode:securityCode} },
            data:{codeHash:hashedVal},
            timeout: ParafaitServer.DEFAULT_TIMEOUT
          })
        .then((response) => {
            // console.log("initial response " + response.data);
            try {
                if (response instanceof Error)
                    throw response;
                if (response.statusCode === 200) 
                {
                    //asyncStorageHandler.setItem(Constants.SECURITY_CODE, securitycode);
                    dispatch(setClientData(new ClientAppVersionMappingDTO(response.data),userId,password,securityCode));
                } 
                
                else
                {
                    // dispatch({type:types.SET_ERROR_CODE, payload:response.statusCode})
                    dispatch({ type: types.FETCH_CLIENT_DETAILS_FAILURE, payload: new Error(response?.data || Constants.UNKNOWN_ERROR_MESSAGE) });
            
                }
            }
            catch (error) {
                // dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.BAD_REQUEST})
                dispatch({ type: types.FETCH_CLIENT_DETAILS_FAILURE, payload: error });
            }
        })
        .catch((error) => {
            console.log("error" + error)
            // dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT})
            dispatch({ type: types.FETCH_CLIENT_DETAILS_FAILURE, payload: error });
        });
     }
    }



export function setClientData  (clientData,userId, password,securityCode) {
    return (dispatch, getState) => {
        // console.log("response sucess" +clientData)
        // console.log("client data url"+ clientData.GateWayURL);
        // console.log("client data url"+ clientData.Deprecated);
        
       
        
        
        asyncStorageHandler.setItem( Constants.CLIENT_DTO, clientData);
        asyncStorageHandler.setItem(Constants.GATEWAY_URL,clientData.GateWayURL );
                                        
       // console.log("sucess state"+ store.getState())

        dispatch({ type: types.FETCH_CLIENT_DETAILS_SUCCESS, payload: clientData });
        dispatch({ type: types.SET_CLIENT_GATEWAY, payload: clientData.GateWayURL });
        dispatch({type:types.SET_SECURITY_CODE, payload:securityCode});

        dispatch(authenticateUser(userId,password));
        
       
        
    
}
}

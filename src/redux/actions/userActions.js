import * as types from './types'
import ServiceHandler from '../../services/APIHandler'
import * as Constants from '../../constants'
import {Platform} from 'react-native'
//import * as GenericMethods from '../../common/'
//import { ClientDTO } from '../lib/model/ClientDTO'
//import PackageJson from '../../../package.json'
import  AsyncStorageHanlder from '../../services/AsyncStorageHanlder'
import { ParafaitServer } from '../../constants/ParafaitServer'
import { store } from '../../../index'
import {generateDate,generateHashCode, generateUUID } from '../../utilitis'
var asyncStorageHandler = new AsyncStorageHanlder();
import NavigationService from '../../lib/NavigationService'
import {getTableauDasboard, getBusinessStratTime} from './dashboardActions'

export function intialSetUp( deviceGUID, clientDTO, gatewayURL)
{

 
  return (dispatch)=>
  {
    dispatch({type:types.SET_GUID, payload:deviceGUID})
    dispatch({ type: types.FETCH_CLIENT_DETAILS_SUCCESS, payload: clientDTO });
    dispatch({ type: types.SET_CLIENT_GATEWAY, payload: gatewayURL });
    dispatch(authenticateUser(userId, password));


  }
}


export function authenticateUser(loginId, password) {
  
    return (dispatch,getState)=>{
      console.log("authenicate user" );
    
        let data={
            LoginId: loginId,
            Password: password
        }
        console.log("data"+ data)
        dispatch({ type: types.AUTHENTICATE_CLIENT_DETAILS_REQUEST });
        ServiceHandler.post({
            url: "api/Login/AuthenticateUsers",
            data,
            timeout: ParafaitServer.DEFAULT_TIMEOUT
          })
            .then((response) => {
              console.log("Authenticate user *** " , JSON.stringify(response.data.userDTO))
              try {
                if (response instanceof Error) throw response;
                if (response.statusCode === 200) {
                  dispatch({
                    type: types.AUTHENTICATE_CLIENT_DETAILS_SUCCESS,
                    payload: response.data.userDTO.UserId  //
                  });
                  dispatch({
                    type:types.SET_LOGIN_ID, payload: response.data.userDTO.LoginId
                  });
                  asyncStorageHandler.setItem(Constants.SET_USER_ID,response.data.userDTO.LoginId)

                
                  dispatch(getClientApp(loginId, password,response.data?.userDTO?.UserId , response.data?.userDTO?.SiteId));

                  asyncStorageHandler.setItem(Constants.USER_NAME,response.data.userDTO.UserName)
                  asyncStorageHandler.setItem(Constants.USER_PASSWORD, response.data.userDTO.LoginId)
                  //asyncStorageHandler.setItem(Constants.LOGIN_DATE, response.data.userDTO.LastLoginTime.slice(8,10))


                  
                } else { 
                    //dispatch({type:types.SET_ERROR_CODE, payload:response.statusCode})
                    dispatch({ type: types.AUTHENTICATE_CLIENT_DETAILS_FAILURE, payload: new Error(response?.data || Constants.UNKNOWN_ERROR_MESSAGE) });
                }
            }
                catch (error) {
                  console.log( "user fail" + error);
                  //dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.BAD_REQUEST})
                    dispatch({ type: types.AUTHENTICATE_CLIENT_DETAILS_FAILURE, payload: error });
                }
            })
            .catch((error) => {
                console.log(" api hit error service CLIENTAPP" + error )
                //dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT})
                dispatch({ type: types.AUTHENTICATE_CLIENT_DETAILS_FAILURE, payload: error });
            });
        }
    }


    export function getClientApp(loginId,password,userId, siteId)
    {
      console.log("client app response");
      return (dispatch,getState)=>
      {
        dispatch({type:types.FETCH_CLIENT_APP_DETAILS_REQUEST})
        ServiceHandler.get({ url: "api/ClientApp/ClientApps", data: { queryParameters: { appId: Constants.APP_ID} }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
        .then(response => {
            console.log("client app  response " + response.data);
            try {
                if (response instanceof Error)
                    throw response;
                if (response.statusCode === 200) 
                {
                    dispatch({type:types.FETCH_CLIENT_APP_DETAILS_SUCCESS, payload:response.data[0]?.ClientAppId});
                    if(Object.keys(store.getState().user.clientAppUserDTO).length === 0 && store.getState().user.clientAppUserDTO.constructor === Object)
                      dispatch(registerClientUser( loginId,password,userId,siteId));
                    else dispatch(loginUser(loginId , password));
                }
                else
                {
                   // dispatch({type:types.SET_ERROR_CODE, payload:response.statusCode})
                    dispatch({ type: types.FETCH_CLIENT_APP_DETAILS_FAILURE, payload: new Error(response?.data || Constants.UNKNOWN_ERROR_MESSAGE ) });
            }}
            catch (error) {
                  console.log("clientapp response fail"+ error)
                dispatch({ type: types.FETCH_CLIENT_APP_DETAILS_FAILURE, payload: error });
            }
        })
        .catch((error) => {
            console.log("error clientapp" + error)
           // dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT})
            dispatch({ type: types.FETCH_CLIENT_APP_DETAILS_FAILURE, payload: error });
        });
        

      }
    }


    export function registerClientUser( loginId,password,userId, siteId)
    {
      
      
    
      
      const guid=store.getState().user.deviceGUID
      let data=
      {
        ClientAppUserId:store.getState().user.clientAppuserId,
        ClientAppId: store.getState().user.clientAppId ,   
        UserId: userId,
         SiteId:siteId,
         IsActive:true,
        CustomerId: -1,
        DeviceGuid: guid,
        DeviceType: Platform.OS==='android' ? 'android':'ios' //'android'

      }

      return (dispatch,getState)=>{
        dispatch({type:types.REGISTER_CLIENT_DETAILS_REQUEST})
        ServiceHandler.post({
          url: "api/ClientApp/ClientAppUser/Register",
          data,
          timeout: ParafaitServer.DEFAULT_TIMEOUT
        })
          .then((response) => {
            console.log("user register response" + JSON.stringify(response.data))
            try {
              if (response instanceof Error) throw response;
              if (response.statusCode === 200) {
               
                dispatch({
                  type: types.REGISTER_CLIENT_DETAILS_SUCCESS,
                  payload: response.data
                });
                asyncStorageHandler.setItem(Constants.REGISTER_CLIENT,response.data)
                dispatch(loginUser(loginId , password));
               

                
              } else {
                 //dispatch({type:types.SET_ERROR_CODE, payload:response.statusCode})
                  dispatch({ type: types.REGISTER_CLIENT_DETAILS_FAILURE, payload: new Error(response?.data || Constants.UNKNOWN_ERROR_MESSAGE) });
              }
          }
              catch (error) {
                console.log( "user register fail" + error);
                  dispatch({ type: types.REGISTER_CLIENT_DETAILS_FAILURE, payload: error });
              }
          })
          .catch((error) => {
              console.log("error register CLIENTAPP" + error)
              //dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT})

              dispatch({ type: types.REGISTER_CLIENT_DETAILS_FAILURE, payload: error });
          });


      }
    }

    export function loginUser(loginId, password)
    {
      let val=store.getState().user.clientAppUserDTO
      console.log("client app user"+val )
      return (dispatch,getState)=>{
      dispatch({type:types.LOGIN_CLIENT_DETAILS_REQUEST})
      ServiceHandler.post({
        url: "api/ClientApp/ClientAppUser/Login",
        data:store.getState().user.clientAppUserDTO,
        timeout: ParafaitServer.DEFAULT_TIMEOUT
      })
        .then((response) => {
          console.log("user login response" + response)
          try {
            if (response instanceof Error) throw response;
            if (response.statusCode === 200) {
              console.log("login success"+ response.data.DeviceGuid);
              dispatch({
                type: types.LOGIN_CLIENT_DETAILS_SUCCESS,
                payload: response.data
              });
              dispatch({
                type: types.SET_GUID,
                payload: response.data.DeviceGuid
              });
            
              asyncStorageHandler.setItem(Constants.DEVICE_GUID,response.data.DeviceGuid )

              dispatch({
                type:types.SET_SECURITY_CODE, payload:true
              })
              asyncStorageHandler.setItem(Constants.SHOW_SECURITY_CODE,true)
            
              // dispatch(getBusinessStratTime())
              // dispatch(getTableauDasboard())
              asyncStorageHandler.getItem(Constants.SET_ON_CHECK)
              .then((checked)=> {

             
                if(checked=='true')
                { 
                  
                  asyncStorageHandler.setItem(Constants.USER_ID, loginId)
                  asyncStorageHandler.setItem(Constants.PASSWORD, password)
                  asyncStorageHandler.setItem(Constants.SET_AUTH, true)
                
                  
                }
                else{
                  asyncStorageHandler.setItem(Constants.USER_ID, '')
                  asyncStorageHandler.setItem(Constants.PASSWORD, '')
                  asyncStorageHandler.setItem(Constants.SET_ON_CHECK, false)
                  
                //asyncStorageHandler.setItem(Constants.SET_ON_CHECK, true)
                }
              //console.log("dartfctfcyfcyfcyfciyf ug lug lug luh g" +checked)
              })
              .catch((error) => {
                  console.log( 'errouy' + error);
                  })

              // asyncStorageHandler.setItem(Constants.USER_ID, loginId)
              // asyncStorageHandler.setItem(Constants.PASSWORD, password)
              

              NavigationService.reset({
                index: 0,
                actions: [NavigationService.navActions("HomeScreen")]
              })
            
    
             

              
            } else {
                //dispatch({type:types.SET_ERROR_CODE, payload:response.statusCode})
                dispatch({ type: types.LOGIN_CLIENT_DETAILS_FAILURE, payload: new Error(response?.data ||Constants.UNKNOWN_ERROR_MESSAGE ) });
            }
        }
            catch (error) {
              console.log( "user login fail" + error);
                dispatch({ type: types.LOGIN_CLIENT_DETAILS_FAILURE, payload: error });
            }
        })
        .catch((error) => {
            console.log("error  login " + error)
            //dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT})

            dispatch({ type: types.LOGIN_CLIENT_DETAILS_FAILURE, payload: error });
        });
      }
    }

    export function signoutUser() {

      let val=store.getState().user.clientAppUserDTO
      console.log("client app user"+val )
      return (dispatch,getState)=>{
      dispatch({type:types.SIGN_OUT_USER_REQUEST})
      ServiceHandler.post({
        url: "api/ClientApp/ClientAppUser/Logout",
        data:store.getState().user.clientAppUserDTO,
        timeout: ParafaitServer.DEFAULT_TIMEOUT
      })
        .then((response) => {
          console.log("user login response" + response)
          try {
            if (response instanceof Error) throw response;
            if (response.statusCode === 200) {
             // console.log("sign out success"+ response.data);
              
              dispatch({
                type: types.SIGN_OUT_USER_SUCESS,
                
              });
              
              
                asyncStorageHandler.deleteItem(Constants.USER_ID);
                asyncStorageHandler.deleteItem(Constants.PASSWORD);
                asyncStorageHandler.deleteItem(Constants.SET_ON_CHECK);
                dispatch({ type: types.CLEAR_TOKEN });
                asyncStorageHandler.setItem(Constants.LOGIN_TOKEN,null);
                NavigationService.reset({
                  index: 0,
                  actions: [NavigationService.navActions("RegestrationScreen")]
                })
               
                
              //NavigationService.navigate('RegestrationScreen');
             

              
            } else {
              //dispatch({type:types.SET_ERROR_CODE, payload:response.statusCode})
              dispatch({ type: types.SIGN_OUT_USER_FAILURE, payload: new Error(response.data || Constants.UNKNOWN_ERROR_MESSAGE) });
            }
        }
            catch (error) {
              console.log( "user login fail" + error);
                dispatch({ type: types.SIGN_OUT_USER_FAILURE, payload: error });
            }
        })
        .catch((error) => {
          //dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT})

          dispatch({ type: types.SIGN_OUT_USER_FAILURE, payload: error });


          });
        }
      }



      export function signoutAllUser() {

        let val=store.getState().user.clientAppUserDTO
        return (dispatch,getState)=>{
        dispatch({type:types.SIGN_OUT_USER_REQUEST})
        ServiceHandler.post({
          url: "api/ClientApp/ClientAppUser/Logout",
          headers: { queryParameters: { allDevices : true} },
          data:store.getState().user.clientAppUserDTO,
          timeout: ParafaitServer.DEFAULT_TIMEOUT
        })
          .then((response) => {
            console.log("user login response" + response)
            try {
              if (response instanceof Error) throw response;
              if (response.statusCode === 200) {
                console.log("sign out success"+ response.data);
                dispatch({
                  type: types.SIGN_OUT_USER_SUCESS
                 
                });

                asyncStorageHandler.deleteItem(Constants.USER_ID);
                asyncStorageHandler.deleteItem(Constants.PASSWORD);
                asyncStorageHandler.deleteItem(Constants.SET_ON_CHECK);
                dispatch({ type: types.CLEAR_TOKEN });
                asyncStorageHandler.setItem(Constants.LOGIN_TOKEN,null);
                NavigationService.reset({
                  index: 0,
                  actions: [NavigationService.navActions("RegestrationScreen")]
                })
               
                
               // NavigationService.navigate('RegestrationScreen');
               
  
                
              } else {
                //dispatch({type:types.SET_ERROR_CODE, payload:response.statusCode})
                  dispatch({ type: types.SIGN_OUT_USER_FAILURE, payload: new Error(response?.data || Constants.UNKNOWN_ERROR_MESSAGE) });
              }
          }
              catch (error) {
                console.log( "user login fail" + error);
                 
                  dispatch({ type: types.SIGN_OUT_USER_FAILURE, payload: error });
              }
          })
          .catch((error) => {
              console.log("error  login " + error)
              //dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT})
              dispatch({ type: types.SIGN_OUT_USER_FAILURE, payload: error });
  
  
            });
          }
        }
  
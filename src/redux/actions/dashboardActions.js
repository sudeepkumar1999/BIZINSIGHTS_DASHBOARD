import * as types from './types'
import ServiceHandler from '../../services/APIHandler'
import * as Constants from '../../constants'
import  AsyncStorageHanlder from '../../services/AsyncStorageHanlder'
import { ParafaitServer } from '../../constants/ParafaitServer'
import { store } from '../../../index'
import {fetchBusinessDate} from '../../utilitis'
var asyncStorageHandler=new AsyncStorageHanlder();



    export const getBusinessStratTime=(showLoader=true)=>{

        return (dispatch,getState)=>{
        
            if(showLoader) dispatch({ type: types.FETCH_START_TIME_REQUEST });
            ServiceHandler.get({ url: "api/Configuration/ParafaitDefaults", data: { queryParameters: { defaultValueName:Constants.BUSINESS_DAY_START_TIME, isActive:Constants.isActive   } }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
            .then(response => {
                console.log("business response " + response.data);
                try {
                    if (response instanceof Error)
                        throw response;
                    if (response.statusCode === 200 &&  response.data[0]?.DefaultValue ) 
                    {
                        //console.log("business start time sucess " + response.data[0].DefaultValue);

                  
    
                        dispatch({ type: types.FETCH_START_TIME_SUCCESS, payload:response.data[0]?.DefaultValue??6});
                        asyncStorageHandler.setItem(Constants.SET_START_TIME, response.data[0]?.DefaultValue)
                        dispatch(getTableauDasboard(showLoader))
                        //let startTime=response.data[0]?.DefaultValue??6
                        
                          
                    }
                    else
                    {
                        dispatch({ type: types.FETCH_START_TIME_FAILURE, payload:null });
                        //asyncStorageHandler.setItem(Constants.SET_START_TIME,"6")

                        dispatch(getTableauDasboard(showLoader))
                       


                        

                        

                    }
                }
                catch (error) {
                    console.log(" buisness error" + error)
                    dispatch({ type: types.FETCH_START_TIME_FAILURE, payload: null });
                    //asyncStorageHandler.setItem(Constants.SET_START_TIME,"6")
                    dispatch(getTableauDasboard())
                }
            })
            .catch((error) => {
                console.log(" buisness error" + error)
                dispatch({ type: types.FETCH_START_TIME_FAILURE, payload: null });
                //asyncStorageHandler.setItem(Constants.SET_START_TIME,"6")
                dispatch(getTableauDasboard(response.data[0]?.DefaultValue??6))
            });
         }
        }


        
export const getTableauDasboard=(showLoader=true)=>
{
    return (dispatch,getState)=>{
        
        if(showLoader) dispatch({ type: types.FETCH_DASHBOARD_DETAILS_REQUEST });
        //ServiceHandler.get({ url: "api/Report/Reports", data: { queryParameters: { isDashboard:Constants.IS_DASH_BOARD} }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
        ServiceHandler.get({ url: "api/Report/TableauDashboards", data: {  }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
        .then(response => {
           
            try {
                if (response instanceof Error)
                    throw response;
                if (response.statusCode === 200) 
                {

                if(!Object.keys(response.data).length){
                 
                    

                    dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.USER_DEFINED_ALERT})

                    if(!showLoader) throw new Error(Constants.UPDATE_DASHBOARD_ERROR)

                    else  throw new Error(Constants.DASHBOARD_NOTFOUND_ERROR)




                    //dispatch({ type: types.FETCH_DASHBOARD_DETAILS_FAILURE, payload: 'dashboard details not found'});
                }
                else
                {
                    
                    
                    
                    
                    
                    dispatch(setDashBoardToStore(response))
                    
                    if((!showLoader)&&(!checkDashboardEqual(response.data,store.getState().dashboard.dashboardDTO))) 
                    {
                       
                        dispatch(handleDashboardUpdate(true))
                    }
                    // dispatch(handleDashboardUpdate(true))
               
                    
                   
                    if(showLoader)
                        dispatch(getTableauToken( response.data[0].ReportId, response.data[0].DBQuery));
                     
                    
                }
            }
                else
                {
                    if(showLoader)
                        dispatch({ type: types.FETCH_DASHBOARD_DETAILS_FAILURE, payload: new Error(response?.data || Constants.UNKNOWN_ERROR_MESSAGE ) })
                    else 
                    dispatch({ type: types.FETCH_DASHBOARD_DETAILS_FAILURE, payload: new Error(Constants.UPDATE_DASHBOARD_ERROR ) })
                        
                    }
                    
            }
            catch (error) {
                if(showLoader)
                    dispatch({ type: types.FETCH_DASHBOARD_DETAILS_FAILURE, payload: error });
                else  dispatch({ type: types.FETCH_DASHBOARD_DETAILS_FAILURE, payload: new Error(Constants.UPDATE_DASHBOARD_ERROR ) })
            }
        })
        .catch((error) => {
            console.log("error" + error)
           // dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT})

        if(showLoader)
            dispatch({ type: types.FETCH_DASHBOARD_DETAILS_FAILURE, payload: error });
        else  dispatch({ type: types.FETCH_DASHBOARD_DETAILS_FAILURE, payload: new Error(Constants.UPDATE_DASHBOARD_ERROR ) })
        });
     }



    }



          

     



    export const getTableauToken=(reportId, dbQuery )=>{
       

            
        return (dispatch,getState)=>{
        
            dispatch({ type: types.FETCH_TOKEN_REQUEST });
            dispatch({type: types.STORE_REPORT_ID, payload:reportId});
            dispatch({type: types.STORE_DB_QUERY, payload:dbQuery});
            ServiceHandler.get(
                { url: "api/Report/TableauDashboards/Token", 
                   data:{ queryParameters: {reportId:reportId, deviceGuid: store.getState().user.deviceGUID }},
                   timeout: ParafaitServer.DEFAULT_TIMEOUT
                 }
               )
            .then(response => {
                console.log(" response " + response.data);
                try {
                    if (response instanceof Error)
                        throw response;
                    if (response.statusCode === 200) 
                    {

                        let token=response?.data?.data||response?.data
                        
                        console.log("token sucess " + response.data );

                        dispatch({ type: types.FETCH_TOKEN_SUCCESS, payload:response.data});
                        dispatch(setURL(token, dbQuery));
    
                      //  dispatch({ type: types.FETCH_TOKEN_SUCCESS, payload:response.data});

                        
                          
                    }
                    else {
                        //dispatch({type:types.SET_ERROR_CODE, payload:response.statusCode})
                        dispatch({ type: types.FETCH_TOKEN_FAILURE, payload: new Error(response?.data || Constants.UNKNOWN_ERROR_MESSAGE) });
                }
            }
                catch (error) {
                    dispatch({ type: types.FETCH_TOKEN_FAILURE, payload: error });
                }
            })
            .catch((error) => {
                console.log("error" + error)
                //dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT})

                dispatch({ type: types.FETCH_TOKEN_FAILURE, payload: error });
            });
         }
    

    }

    export function setURL(token, dbQuery)
    {
        return (dispatch, getState)=>{
        console.log( "report url" + store.getState().dashboard.dbQuery)
            
         let {formatedDate, formatedTime } =fetchBusinessDate();
        //  console.log(" *******************token************" + token)
        //  console.log("formated date "+  formatedDate);
         let loginId= store.getState().user.loginId;
         //let reportURL=store.getState().dashboard.dbQuery
        let reportURL=dbQuery
        reportURL= reportURL.replace("@Token", token);
        reportURL= reportURL.replace("@User", loginId);
        reportURL= reportURL.replace("@Date", formatedDate);
        reportURL= reportURL.replace("@Time", formatedTime);
         dispatch({type: types.FETCH_TABLEU_URL_REQUEST})
         dispatch({type:types.SET_WEB_VIEW_URL , payload:reportURL})
        
         
        }

    }

export function onLoadURL()
{ 
    return (dispatch, getState) =>
    
 {
    dispatch({type: types.FETCH_TABLEU_URL_SUCCESS})


    }


}




export function setDashBoardToStore(response)
{
    return (dispatch)=>
    {
                    response.data.sort((a,b)=>a.ReportId-b.ReportId)
                    dispatch({type:types.SET_DB_QUERY, payload: response.data[0].DBQuery});
                    dispatch({type:types.SET_REPORT_ID, payload:response.data[0].ReportId});
                    dispatch({type:types.SET_REPORT_NAME, payload:response.data[0].ReportName});
                    dispatch({ type: types.FETCH_DASHBOARD_DETAILS_SUCCESS, payload:response.data}); 
                    // dispatch(getTableauToken( response.data[0].ReportId, response.data[0].DBQuery));
                    asyncStorageHandler.setItem(Constants.SET_DASHBOARD,JSON.stringify(response.data));

    }
}


export  function handleDashboardUpdate(data)
{
    
    return (dispatch)=>{
        dispatch({type:types.UPDATE_REQUIRED, payload:data})


    }

}


export function checkDashboardEqual(data,storedata )
{
    data.sort((a,b)=>a.ReportId-b.ReportId)
    
  return  data.length === storedata.length && data.every((o, idx) => objectsEqual(o, storedata[idx]))

    
}

export function objectsEqual(o1,o2)
{
  return   typeof o1 === 'object' && Object.keys(o1).length > 0 
    ? Object.keys(o1).length === Object.keys(o2).length 
        && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
    : o1 === o2;
}
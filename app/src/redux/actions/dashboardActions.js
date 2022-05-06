import * as types from './types'
import ServiceHandler from '../../services/APIHandler'
import * as Constants from '../../constants'
import  AsyncStorageHandler from '../../services/AsyncStorageHanlder'
import { ParafaitServer } from '../../constants/ParafaitServer'
import { store } from '../../../index'
import {fetchBusinessDate} from '../../utilitis'
var TOTAL_COLLECTION_SITE_ID="9999"
var asyncStorageHandler=new AsyncStorageHandler();

    export const getSalesDashboard=()=>{
        return (dispatch, getState)=>{
            dispatch({type:types.FETCH_SALES_DASHBOARD_REQUEST})
            ServiceHandler.get({ url: "api/Report/SalesDashboard", data: {  }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
            .then(response => {
             
                try {
                    if (response instanceof Error)
                        throw response;
                    if (response.statusCode === 200  ) 
                    {
                      

                       const  siteCollectionList=response?.data?.SiteCollectionList
                     
                      
                       var  sitList=[]
                       var totalCollection={}
                       

                        if(siteCollectionList?.length>0)
                        {
                           siteCollectionList.forEach((element, index, array) => {
                               
                               if(element.hasOwnProperty("WeeklyCollectionPOS")&& Array.isArray(element.WeeklyCollectionPOS)&&element.WeeklyCollectionPOS.length)
                               {
                                let posCollections=[];
                                
                                element.WeeklyCollectionPOS.forEach((ele, index,array)=>
                                {
                                 
                                    posCollections.push(ele)

                                })

                               
                            
                        


                            const {SiteId,
                                SiteName,
                                CollectionToday,
                                CollectionPreviousDay,
                                CollectionWeek,
                                GamePlayToday,
                                GamePlayPreviousDay,
                                GamePlayWeek,
                                GamePlayPreviousWeek
                               }=element
                            let sitCollection={
                                SiteId,
                                SiteName,
                                CollectionToday,
                                CollectionPreviousDay,
                                CollectionWeek,
                                GamePlayToday,
                                GamePlayPreviousDay,
                                GamePlayWeek,
                                GamePlayPreviousWeek,
                                PosCollections:posCollections
                                

                            }
                            if(sitCollection.SiteId!=TOTAL_COLLECTION_SITE_ID)
                                sitList.push(sitCollection)
                            else
                                totalCollection=sitCollection;

                               }
                              

                            

                            });
                          

                        }

                  
    
                        dispatch({ type: types.FETCH_SALES_DASHBOARD_SUCCESS, payload:response.data[0]?.DefaultValue??6});
                      
                        
                          
                    }
                    else
                    {
                        dispatch({ type: types.FETCH_SALES_DASHBOARD_FAILURE, payload:null });
                     
                       


                        

                        

                    }
                }
                catch (error) {
                    
                    dispatch({ type: types.FETCH_START_TIME_FAILURE, payload: null });
                    
                }
            })
            .catch((error) => {
                
                dispatch({ type: types.FETCH_START_TIME_FAILURE, payload: null });
               
                
            });
        }
    }

    export const getBusinessStartTime=(showLoader=true)=>{

        return (dispatch,getState)=>{
        
            if(showLoader) dispatch({ type: types.FETCH_START_TIME_REQUEST });
            ServiceHandler.get({ url: "api/Configuration/ParafaitDefaults", data: { queryParameters: { defaultValueName:Constants.BUSINESS_DAY_START_TIME, isActive:Constants.isActive   } }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
            .then(response => {
                try {
                    if (response instanceof Error)
                        throw response;
                    if (response.statusCode === 200 &&  response.data[0]?.DefaultValue ) 
                    {
                      

                  
    
                        dispatch({ type: types.FETCH_START_TIME_SUCCESS, payload:response.data[0]?.DefaultValue??6});
                        asyncStorageHandler.setItem(Constants.SET_START_TIME, response.data[0]?.DefaultValue)
                        dispatch(getTableauDashboard(showLoader))
                        
                        
                          
                    }
                    else
                    {
                        dispatch({ type: types.FETCH_START_TIME_FAILURE, payload:null });
                  

                        dispatch(getTableauDashboard(showLoader))
                       


                        

                        

                    }
                }
                catch (error) {
                    
                    dispatch({ type: types.FETCH_START_TIME_FAILURE, payload: null });
                    dispatch(getTableauDashboard())
                }
            })
            .catch((error) => {
                console.log(" buisness error" + error)
                dispatch({ type: types.FETCH_START_TIME_FAILURE, payload: null });
                dispatch(getTableauDashboard(showLoader))
            });
         }
        }


        
export const getTableauDashboard=(showLoader=true)=>
{
    return (dispatch,getState)=>{
        
        if(showLoader) dispatch({ type: types.FETCH_DASHBOARD_DETAILS_REQUEST });
        ServiceHandler.get({ url: "api/Report/TableauDashboards", data: {  }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
        .then(response => {
           
            try {
                if (response instanceof Error)
                    throw response;
                if (response.statusCode === 200) 
                {
                    console.log("dashboard details ", JSON.stringify(response) )

                
                if(!Object.keys(response.data).length){
                 
                    

                    dispatch({type:types.SET_ERROR_CODE, payload:ParafaitServer.ERROR_TYPES.USER_DEFINED_ALERT})

                    if(!showLoader) throw new Error(Constants.UPDATE_DASHBOARD_ERROR)

                    else  throw new Error(Constants.DASHBOARD_NOTFOUND_ERROR)




                    
                }
                else
                {
                    
                    
                    
                    
                    
                    dispatch(setDashBoardToStore(response))
                    
                    if((!showLoader)&&(!checkDashboardEqual(response.data,store.getState().dashboard.dashboardDTO))) 
                    {
                       
                        dispatch(handleDashboardUpdate(true))
                    }
                
               
                    
                   
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
                try {
                    if (response instanceof Error)
                        throw response;
                    if (response.statusCode === 200) 
                    {

                        let token=response?.data?.data||response?.data
                        
                        console.log("token sucess " + response.data );

                        dispatch({ type: types.FETCH_TOKEN_SUCCESS, payload:response.data});
                        dispatch(setURL(token, dbQuery));
    
                     

                        
                          
                    }
                    else {
                        
                        dispatch({ type: types.FETCH_TOKEN_FAILURE, payload: new Error(response?.data || Constants.UNKNOWN_ERROR_MESSAGE) });
                }
            }
                catch (error) {
                    dispatch({ type: types.FETCH_TOKEN_FAILURE, payload: error });
                }
            })
            .catch((error) => {
               
                dispatch({ type: types.FETCH_TOKEN_FAILURE, payload: error });
            });
         }
    

    }

    export function setURL(token, dbQuery)
    {
        return (dispatch, getState)=>{
       
            
         let {formatedDate, formatedTime } =fetchBusinessDate();
         let loginId= store.getState().user.loginId;
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
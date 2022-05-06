


import ServiceHandler from '../../services/APIHandler'
import * as Constants from '../../constants'
import { ParafaitServer } from '../../constants/ParafaitServer'
import {generateDate,generateHashCode} from '../../utilitis'
import NavigationService from '../../lib/NavigationService';
import * as types from './types'

export const   updateRequired =(deprecated)=>
{
  return (dispatch)=>
  {
  dispatch({type:types.SET_DEPRECATED, payload:deprecated});

  }


}

export const checkForUpdate=async(securitycode)=>
{
    
        
  
    let securityCode= securitycode.slice(-2);
    const currentTime=generateDate();
    const hashedVal=generateHashCode(Constants.APP_ID,securitycode,currentTime)
    
        try{

   
        
     const  response =  await ServiceHandler.post({
            url: "api/ClientApp/ClientAppVersion",
            headers: { queryParameters: { appId: Constants.APP_ID, buildNumber : Constants.PACKAGE_VERSION,  generatedTime:currentTime, securityCode:securityCode} },
            data:{codeHash:hashedVal},
            timeout: ParafaitServer.DEFAULT_TIMEOUT
          })
          // if(response?.statusCode==200) return {status:true, data:response.data};
          // else  return {status:false}
          if(response?.statusCode==200&&response.data?.Deprecated!='')
          {
            updateRequired(response?.data.Deprecated)

          }


        }
        catch(error)
        {

            
        }
       
     
    }

    
    
    export const checkValidToken=async()=>

    {
      try 
      {
      
      

      const response=  await  ServiceHandler.get({ url: "api/ClientApp/ClientApps", data: { queryParameters: { appId: Constants.APP_ID} }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
       
          if (response?.statusCode==200) 
          {
           
            NavigationService.reset({
              index: 0,
              actions: [NavigationService.navActions("RegestrationScreen")]
            })

          }
          else  {
            NavigationService.reset({
              index: 0,
              actions: [NavigationService.navActions("RegestrationScreen")]
            })
            
          }
      }

      catch(error)
      {
        console.log("error", error)

      }

            
}
        





import ServiceHandler from '../../services/APIHandler'
import * as Constants from '../../constants'
import { ParafaitServer } from '../../constants/ParafaitServer'
import {generateDate,generateHashCode} from '../../utilitis'
import NavigationService from '../../lib/NavigationService';

export const checkForUpdate=async(securitycode)=>
{
    
        
  
    let securityCode= securitycode.slice(-2);
    const currenntTime=generateDate();
    const hashedVal=generateHashCode(Constants.APP_ID,securitycode,currenntTime)
    
        try{

   
        
     const  response =  await ServiceHandler.post({
            url: "api/ClientApp/ClientAppVersion",
            headers: { queryParameters: { appId: Constants.APP_ID, buildNumber : Constants.PACKAGE_VERSION,  generatedTime:currenntTime, securityCode:securityCode} },
            data:{codeHash:hashedVal},
            timeout: ParafaitServer.DEFAULT_TIMEOUT
          })
          if(response?.statusCode==200) return {status:true, data:response.data};
          else  return {status:false}


        }
        catch(error)
        {

            console.log("error from central", error)
        }
       
     
    }

    
    
    export const checkValidToken=async()=>

    {
      try 
      {
      console.log("check valid token")
      

      const response=  await  ServiceHandler.get({ url: "api/ClientApp/ClientApps", data: { queryParameters: { appId: Constants.APP_ID} }, timeout: ParafaitServer.DEFAULT_TIMEOUT })
       
          if (response?.statusCode==200) 
          {
           
            NavigationService.reset({
              index: 0,
              actions: [NavigationService.navActions("HomeScreen")]
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
        


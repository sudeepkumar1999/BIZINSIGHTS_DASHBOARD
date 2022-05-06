import React ,{Component, } from 'react'
import {View, Text, Image, StyleSheet,BackHandler,Alert} from 'react-native'
import NavigationService from '../lib/NavigationService';
import AsyncStorageHanlder from '../services/AsyncStorageHanlder'
import * as GenericMethods from '../common/index'
import * as types from '../redux/actions/types'
import * as  Constants from '../constants'
import {initialSetUp,setToken,setGateway,setGuid,setDashboard, showVerificationCode,registerClient} from '../redux/actions/splashscreenActions'
import { connect } from 'react-redux'
import { checkForUpdate,checkValidToken} from '../redux/actions/updateAction'
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
const appstoreURL="https://itunes.apple.com/app/id1547246277"
const playStoreURL="https://play.google.com/store/apps/details?id=com.semnox.analyticsdashboardapp"
import {generateUUID } from '../utilitis'

var asyncStorageHandler=new AsyncStorageHanlder();

 class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state={ 
            loginId:'',
            password:'',
            isChecked:false,
            guId:null,
            gatewayURL:null,
            isMounted:true
   
        }
    }

    gotoHomeScreen()
    {
        NavigationService.reset({
            index: 0,
            actions: [NavigationService.navActions("HomeScreen")]
          })

    }

    gotoRegestrationScreen()
    {
        setTimeout(()=>NavigationService.reset({
            index: 0,
            actions: [NavigationService.navActions("RegestrationScreen")]
          }), 0)
        

    }



    handleUpdate=()=>
    {
  
       if (Platform.OS === "android") {
           Linking.canOpenURL(playStoreURL)
             .then(() => {
               Linking.openURL(playStoreURL);
             })
             .catch();
         // Redirect Apple store
         } else if (Platform.OS === "ios") {
           Linking.canOpenURL(appstoreURL)
             .then(() =>
               Linking.openURL(appstoreURL)
             )
             .catch();
         }
  
    }
  

  

    componentDidMount() {

        
     
// asyncStorageHandler.getItems([Constants.SET_DASHBOARD, Constants.SET_USER_ID])
// .then((response)=>
// {
    
    
//     let data=response.map(([key,value])=>value)
    

//     const [dashboard,userId]=data


    
    
//     this.props.setDashboard(JSON.parse(dashboard),userId)
    

// }).catch((error)=>
// {
//     console.log("error", error)
// })

// asyncStorageHandler.getItems([Constants.DEVICE_GUID, Constants.GATEWAY_URL,Constants.CLIENT_DTO, Constants.LOGIN_TOKEN,Constants.USER_NAME,Constants.USER_PASSWORD,Constants.SECURITY_CODE, Constants.SHOW_SECURITY_CODE,Constants.REGISTER_CLIENT])
//  .then((response)=>{ 

//      let data=response.map(([key,value])=>value)
       
//      const [ guid, gatewayURL,clientDTO, loginToken, userName, password, securityCode,displaySecurityCode, clientAppDTO]=data;
//      if(clientAppDTO!=null)
//      {
//          this.props.registerClient(JSON.parse(clientAppDTO))
//      }
//      if(loginToken!=null) 
//      {
//       this.props.setToken(loginToken);
//      }

//      if(displaySecurityCode!=null)
//      {
//          this.props.showVerificationCode(true)
//      }

     
     
    //  if(gatewayURL!=null)  
    //  {
        
    //      this.props.setGateway(gatewayURL,clientDTO);
    //  }
     
     
    //  if(guid!=null) 
    //  {
    //      this.props.setGuid(guid);
    //  }
    //  else{
    //      let guid=generateUUID();
    //      this.props.setGuid(guid);

    //  }

    const {securityCode, clientGateway, loginToken}=this.props

    

     if(securityCode!=null)
     {
         checkForUpdate(securityCode)

    if(loginToken==null)
    {
                this.gotoRegestrationScreen()
                
            }
    else
    {
                checkValidToken();
            
        
            
            }
    //      then((response)=>
    //      {
    //          if(response.status)
    //          {
                
    //            if(response?.data?.Deprecated=='M')
    //            {

    //             Alert.alert(
    //                 "Please Update",
    //                 "You will have to update your app to latest version to continue using.",
    //                 [
                      
    //                   { text: "Ok", onPress: () => {
    //                       BackHandler.exitApp();
    //                       this.handleUpdate()

    //                   } }
    //                 ],
    //                 { cancelable: false }
    //               )
    //             }

             
    //          else if(response.data?.Deprecated=='O')
    //          {
    //             Alert.alert(
    //                 "Please Update",
    //                 "New version of the app is available. Do you want to update?",
    //                 [
    //                   {
    //                     text: "Later",
    //                     onPress: () =>
    //                     { 
    //                       console.log("Cancel Pressed")
    //                       this.state.update=false
    //                   }
                        
    //                   },
    //                   { text: "Ok", onPress: ()=>
    //                 {
    //                     BackHandler.exitApp();
    //                     //Linking.openURL('https://play.google.com/store/apps/details?id=com.parafait.dashboardapp')
    //                     this.handleUpdate()
                        
    
    //                 } }
    //                 ],
    //                 { cancelable: false }
    //               )
    //          }

    //          else 
    //          if(loginToken==null)
    //          {
    //              this.gotoRegestrationScreen()
                
    //          }
    //     else
    //     {
    //         checkValidToken();
            
           
            
    //     }
    // }
    // // else {
    // //     this.gotoRegestrationScreen()

    // // }

    //      })
        
     }
     else{
         console.log("go to regesration")
         this.gotoRegestrationScreen()
     }

     

    }

    render() {
        return (
            <View style = { styles.MainContainer }>  
             <View style={styles.SplashScreen_RootView}>  
                 <View style={styles.SplashScreen_ChildView}>  
                       <Image  source={require('../assets/image/Splash_Screen_Logo.png')}
                    style={{width:'100%', height: '100%', resizeMode: 'contain'}} />  
                    <View style={{flex:1, backgroundColor:'white', width:'100%', height:'100%', justifyContent:'flex-end', alignItems:'center' }}>
                  <Text style={{fontSize:20}}>V_{Constants.CURRENT_VERSION}</Text>

                  </View>
                </View>  
                
             </View>
                
            </View>  
        )
    }

    
}


const mapStateToProps = (state) => {
    
    
    


    return {
        // email: state.auth.email,
        // password: state.auth.password,
        error: state.ui.error,
        loading: state.ui.loading,
        clientGateway:state.client.clientGateway,
        userDTO:state.user.clientAppUserLoginDTO,
        userId:state.asyncStore.userId,
        securityCode:state.client?.securityCode,
        loginToken:state?.deviceInfo?.token
       
        
    }
     // gives email state  
}


const styles= StyleSheet.create(
    {
       
        MainContainer:  
        {  
            flex: 1,  
            justifyContent: 'center',  
            alignItems: 'center',  
            paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  ,
            backgroundColor: '#fff' 
        },  
       
        SplashScreen_RootView:  
        {  
            justifyContent: 'center',  
            flex:1,  
            margin: 10,  
            position: 'relative',  
            width: '100%',  
            height: '100%', 
            //backgroundColor: '#00000010'  
          },  
       
        SplashScreen_ChildView:  
        {  
            justifyContent: 'center',  
            alignItems: 'center',  
           // backgroundColor: '#00000010' ,
            flex:1,  
            marginHorizontal:10*vw
        },  
    }
)


export default connect(mapStateToProps, { setToken,  setGuid,setGateway,setDashboard,showVerificationCode,registerClient })(SplashScreen);


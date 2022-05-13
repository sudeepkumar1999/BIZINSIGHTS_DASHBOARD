import React , {Component} from 'react'
import {View, StyleSheet,StatusBar, Text, Alert, BackHandler,   Linking} from 'react-native'
import {getClientDetail } from  '../redux/actions/clientActions'
import {authenticateUser , intialSetUp} from '../redux/actions/userActions'
import {handleError} from '../redux/actions/clearErrorActions'
import { connect } from 'react-redux'
import  {Input,Button, Spinner, HeaderTitle} from '../components/index'
import  Checkbox from '../components/Checkbox'
//import * as GenericMethods from '../common/index'
import { ParafaitServer } from '../constants/ParafaitServer'
import { store } from '../../index'

import * as  Constants from '../constants'
import AsyncStorageHanlder from '../services/AsyncStorageHanlder'
import * as GenericMethods from '../common/index'
import * as types from '../redux/actions/types'
import NavigationService from '../lib/NavigationService'


var asyncStorageHandler=new AsyncStorageHanlder();


 
class RegestrationScreen extends Component 
{
    static navigationOptions={

        //title: 'Home',
        headerStyle: {
             backgroundColor: '#fff',

   
            
        },
       headerTitle:()=><HeaderTitle/>,
       
       
        
     
       
        
        
    }

     state={ 
         loginId:'',
         password:'',
         verificationCode:'',
         isChecked:false,
         guId:null,
         gatewayURL:{},
         isMounted:true,
         clientDTO: {}

     }

     onchangeLoginId=(loginId)=>
     {
         this.setState(
             {
                 loginId:loginId
             }
         )

     }

     onChangePassword=(password)=>
     {
         this.setState(
             {
                 password:password
             }
         )

     }

     onChangeVerificationcode=(verificationCode)=>
     {
         this.setState(
             {
                verificationCode:verificationCode
             }
         )
     }

     onSelectCheckbox=()=>
    {
      
        
         this.setState(
         {
             isChecked:!this.state.isChecked
         })
    }

    onClearButtonPress=()=>
    {
        this.setState(
            {
                loginId:'',
                password: '',
                verificationCode: ''
            }
        )
    }

     onRegisterButtonPress=()=>
    {
        
        //console.log("state"+ this.state)
         //const {loginId,password,verificationCode}=this.state
         if(this.state.loginId==='')
         {
             GenericMethods.showAlertWithOk( Constants.loginmsg, ()=>this.props.handleError())
         }
         else 
         
            if(this.state.password==='')
            {
                GenericMethods.showAlertWithOk( Constants.passwordmsg, ()=>this.props.handleError())
            }

            else 
            if(this.state.verificationCode==='')
            {
                GenericMethods.showAlertWithOk( Constants.verifymsg, ()=>this.props.handleError())
            }
         
         else
         {
          if(this.state.isChecked)
          {
              asyncStorageHandler.setItem(Constants.SET_ON_CHECK, true )
          }


         if(Object.keys(this.props.clientGateway).length === 0 && this.props.clientGateway.constructor === Object )
         {
            
            this.props.getClientDetail(this.state.loginId, this.state.password, this.state.verificationCode)
                
         }
         else
         {
            this.props.authenticateUser(this.state.loginId, this.state.password);
            
         }
        }
      

    }

    onLoginButtonPress= ()=> {
       

        //console.log("state"+ this.state)
         //const {loginId,password,verificationCode}=this.state
         if(this.state.loginId==='')
         {
             GenericMethods.showAlertWithOk( Constants.loginmsg, ()=>this.props.handleError())
         }
         else 
         
            if(this.state.password==='')
            {
                GenericMethods.showAlertWithOk( Constants.passwordmsg, ()=>this.props.handleError())
            }
        else{

        
        if(this.state.isChecked)
        {
            asyncStorageHandler.setItem(Constants.SET_ON_CHECK,true)
        }

        //this.props.intialSetUp( this.state.clientDTO, this.state.gatewayURL, this.state.loginId, this.state.password)
        this.props.authenticateUser(this.state.loginId, this.state.password);
       
       
    }
}
    
    renderVerificationCode=()=>
    {
        
    //   if(Object.keys(this.props.guId).length === 0 && this.props.guId.constructor === Object)
    if(Boolean(!this.props.hideSecurityCode))
      {
        return  <Input placeholder="Verification Code" value={this.state.verificationCode} onChangeText={this.onChangeVerificationcode}/>
      }
      
      return null
        
        

    }

    handleRestart=()=> {
        this.props.handleError();
        store.dispatch({ type: types.RESET_UI });
        store.dispatch({ type: types.CLEAR_TOKEN });
        asyncStorageHandler.setItem(Constants.LOGIN_TOKEN, null);

        NavigationService.reset({
            index: 0,
            actions: [NavigationService.navActions("SplashScreen")]
          })

    }
    
   

     renderLoader=()=>
     {
        // console.log("error messge" + this.props?.error?.message)
        
       
         if(this.props?.error)
         
         {
            
             
            if(this.props.errorCode!=ParafaitServer.ERROR_TYPES.NONE)
            {
                switch (this.props?.errorCode) {
                    case ParafaitServer.ERROR_TYPES.BAD_REQUEST:
                        GenericMethods.showAlertWithOk(this.props?.error?.message, ()=>this.props.handleError());
                        break;
                    case ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT:
                        GenericMethods.showErrorAlertWithOk( Constants.UNKNOWN_ERROR_MESSAGE, ()=>this.props.handleError())
                          break;
                    case ParafaitServer.ERROR_TYPES.UNAUTHORIZED:
                    
                        GenericMethods.showAlertWithOk(this.props?.error?.message, ()=>this.props.handleError());
                         break;
                        
                    case ParafaitServer.ERROR_TYPES.USER_DEFINED_ALERT:
                       GenericMethods.showAlertWithOk(this.props?.error?.message, ()=>this.props.handleError());
                       break;
                    case ParafaitServer.ERROR_TYPES.FORBIDDEN:
                        GenericMethods.showAlertWithOk(this.props?.error?.message, ()=>this.props.handleError());
                        break;    
                    // case ParafaitServer.ERROR_TYPES.NONE:
                    //     GenericMethods.showAlertWithOk(this.props.error.message, ()=>this.props.handleError());
                    //     break;
                    case ParafaitServer.ERROR_TYPES.NOT_FOUND:
                        GenericMethods.showAlertWithOk(this.props?.error?.message, ()=>this.props.handleError());
                        break;
                    default:
                        GenericMethods.showErrorAlertWithRestart(Constants.UNKNOWN_ERROR_MESSAGE, ()=>this.handleRestart());
                        
                }
            }
            
           
         }
        
     }

     renderButtons=()=>{

        // if(Object.keys(this.props.guId).length === 0 && this.props.guId.constructor === Object)
        if(Boolean(!this.props.hideSecurityCode))
        {
            return(
                <View style={styles.buttonContaner}>
                <Button onPress={this.onRegisterButtonPress}>Register</Button>
                <Button onPress= {this.onClearButtonPress}>Clear</Button>
                </View>
                
                
            )
        }
        else
        {
            return(
                <View style={styles.buttonContaner}>
                <Button onPress={this.onLoginButtonPress}>Login</Button>
               </View>
                
               
            )
        }

     }


    //handle update 


    componentDidMount()
     {
        asyncStorageHandler.getItem(Constants.SET_AUTH)
        .then((auth)=>{
  
         if(auth=='true')
         {
          asyncStorageHandler.getItem(Constants.SET_ON_CHECK)
          .then((checked)=>{
              
          asyncStorageHandler.getItem(Constants.USER_ID)
      .then(( userId) =>
      asyncStorageHandler.getItem(Constants.PASSWORD)
      .then((password)=> {
      //console.log("dartfctfcyfcyfcyfciyf ug lug lug luh g" +checked)
       this.setState(
           {
               loginId:(checked==null||checked=='false')?   '' : userId,
               password: (checked==null||checked=='false')? '': password,
               isChecked:(checked==null||checked=='false')? false: true
              
  
           }
       )
      })
      .catch((error) => {
          
          }))
      .catch((error) => {
      })
  })
  
      .catch((error)=>{
          
      })
  
       }
      })
       .catch((error)=>{
          
      })

        

    }

   
    render(){
        
        
        
       
        return(
           // {this.renderLoader()}
            
            <View style={{flex:1}}>
            {/* <NavHeader/> */}
            <View style={styles.container}>
                {this.renderLoader()}
                <Spinner loading={this.props.loading}  />
                <Input placeholder="Login ID" value={this.state.loginId} onChangeText={this.onchangeLoginId} secureTextEntry={false}/>
                <Input placeholder="Password" value={this.state.password} onChangeText={this.onChangePassword} secureTextEntry= {true}/>
                {this.renderVerificationCode()}
                <Checkbox value={this.state.isChecked} onValueChange={this.onSelectCheckbox}/>
                {this.renderButtons()}
            
                
                </View>  
               
                  <View style={{flex:1, backgroundColor:'white', width:'100%', height:'100%', justifyContent:'flex-end', alignItems:'center' }}>
                  <Text style={{fontSize:20}}>V_{Constants.CURRENT_VERSION}</Text>

                  </View>
                
            </View>
          
           
               
        )
        

    }

    componentWillUnmount()
    {
        this.setState(
            {
                isMounted:false
            }
        )
    }


    
 }



const styles=StyleSheet.create(
    {
        container:
        {
            flex:9,
            alignItems:'flex-start',
            justifyContent:'center',
            backgroundColor:'#fff',
            width:'100%',
            height:'100%',
            paddingHorizontal:'16%'

        },

        buttonContaner:
        {
            flexDirection:'row',
            width:'100%'
            
            


        }

    }
)

const mapStateToProps = (state) => {
   
    
    
    


    return {
        // email: state.auth.email,
        // password: state.auth.password,
        error: state.ui.error,
        loading: state.ui.loading,
        clientGateway:state.client.clientGateway,
        userDTO:state.user.clientAppUserLoginDTO,
        guId:state.user.deviceGUID,
        errorCode: state.ui.errorCode,
        isChecked: state.user.isChecked,
        hideSecurityCode:state.user.hideSecurityCode
        
    }
     // gives email state  
}



export default connect(mapStateToProps, { getClientDetail,handleError, authenticateUser, intialSetUp })(RegestrationScreen);
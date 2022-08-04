import React from 'react'
import {View, Text,Alert, Image, ImageBackground} from 'react-native'
import  Icon from 'react-native-vector-icons/Ionicons'
import Menu, { MenuItem} from 'react-native-material-menu';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
import AsyncStorageHanlder from '../services/AsyncStorageHanlder'
var asyncStorageHandler=new AsyncStorageHanlder();
import * as GenericMethods from '../common/index'
import * as types from '../redux/actions/types'
import { useDispatch } from 'react-redux'
import {signoutUser , signoutAllUser} from '../redux/actions/userActions'
import * as  Constants from '../constants'
import {config} from '../constants/parafaitConfig';



const msg= "This action will clear your data"


const HeaderTitle=()=>
 {
   return  (
    // <View  style={{ width:75*vw,flex:1, justifyContent:'center', backgroundColor:'red', alignItems:'flex-start', padding:2}}>
    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', }}>
    <Image
    source={require('../assets/data/image/BIZINSIGHTS_Header_Logo.png')}
    resizeMode="contain"
    //style={{ width:'90%' , flex:1}}
    style={{ width: 250,  height:50, }}
    
    >
  

    </Image>
    <Text style={{  marginRight:10*vw, textAlign:'justify', alignSelf:'center', fontSize:16,fontWeight:'bold'}}>{" "}{config.VERSION_NAME}</Text>
    </View>
    
         
              //  </View>
   )
   
  //  <Text style={{ fontSize:2.5*vh, fontWeight:'500' ,color:'white'}}>{Constants.APP_IDENTIFIER}</Text>
 }

const HeaderIcon=()=>


{
  const dispatch = useDispatch()

  const handleSignout =()=>
  {
    dispatch(
      signoutUser()
      
    );
  }

  const handleSignoutAll =()=>
  {
    dispatch(
      signoutAllUser()
      
    );
  }

     _menu = null;
 
    setMenuRef = ref => {
      _menu = ref;
    };
   
    const  signout= () => {
      _menu.hide();
      GenericMethods.showAlertWithCancel(msg, ()=>handleSignout())
    };


    const  signoutAll= () => {
      _menu.hide();
      GenericMethods.showAlertWithCancel(msg, ()=>handleSignoutAll())
    };
   
    showMenu = () => {
      _menu.show();
      
    };
   
   
    return(
      <View  style={{paddingRight:5*vw}}>
        <Menu
            ref={setMenuRef}
            button={<Text onPress={showMenu}> <Icon name='power-sharp'    size={vw*7} color='#000' /></Text>}
        >
            <MenuItem  onPress={signout}>Sign out</MenuItem>
            <MenuItem onPress={signoutAll}>Sign out from all devices</MenuItem>
            {/* <MenuItem onPress={hideMenu}>Settings</MenuItem> */}
        </Menu>
     </View>
        
        
       
    )
}

export { HeaderIcon , HeaderTitle}
import React, {Component}from 'react'
import {View, Text, FlatList,PlatForm,TouchableHighlight, TouchableWithoutFeedback, Button, TouchableOpacity,RefreshControl, StyleSheet,BackHandler,Alert,ScrollView, Linking} from  'react-native'
import { connect } from 'react-redux'
import {getTableauDasboard, getBusinessStratTime,getTableauToken, onLoadURL,fetchDataFromBackground,handleDashboardUpdate} from  '../redux/actions/dashboardActions'
import { ParafaitServer } from '../constants/ParafaitServer'
import {store} from '../../index'
import  {HeaderIcon, HeaderTitle, Spinner} from '../components/index'
import { WebView } from 'react-native-webview';
import AsyncStorageHanlder from '../services/AsyncStorageHanlder'
var asyncStorageHandler=new AsyncStorageHanlder();
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
import * as GenericMethods from '../common/index'
import {handleError} from '../redux/actions/clearErrorActions'
import NavigationService from '../lib/NavigationService'
import * as types from '../redux/actions/types'
import * as  Constants from '../constants'
var RNFS = require('react-native-fs')

const appstoreURL="https://itunes.apple.com/app/id1547246277"
const playStoreURL="https://play.google.com/store/apps/details?id=com.semnox.analyticsdashboardapp"


//import * as  Constants from '../constants'



const INJECTED_JS = `
window.onscroll = function() {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop
    }),     
  )
}`
 
class HomeScreen extends Component 
{ 
  webview = null;
    static navigationOptions={
        headerLeft : () => {},
        gestureEnabled: false,
        headerStyle: {
            backgroundColor: '#fff',

  
           
       },
      headerTitle: () =><HeaderTitle/>,
      //<LogoTitle />,

      headerRight: ()=> <HeaderIcon/>

      
      
    
    }

    backAction = () => {
      const msg ="Are you sure you want to go back?"
        
        GenericMethods.showAlertWithCancel(msg,  () => BackHandler.exitApp(), () => null )
        return true;
      };

      handleSelection = (id) => {

        
     
        
      this.setState({selectedId: id})
     }




      onPress( ReportId, DBQuery)
      {
        // if (flag == 1) {
        //   this.setState({selected: true});
        // }
        // this.setState({SelectedButton: button})
        this.handleSelection(ReportId)
        this.props.getTableauToken(ReportId,DBQuery)
      }


      onRefresh =()=> {
        this.setState(
          {
            refreshing: true
           
          }
        )

        this.props.getTableauToken(store.getState().dashboard.currentReportId,store.getState().dashboard.currentdbQuery)



      }

      onLoadEnd = () =>
      {
        
        this.props.onLoadURL()
        this.setState({refreshing: false})
      }
      

    
    
      renderItem=(item)=>{
        const {ReportName,DBQuery,ReportId  }=item.item


       
       
        //style={styles.tabButton}
       
        return(
           
               
              <TouchableOpacity  style={item.item.ReportId === this.state.selectedId ? styles.selected :styles.tabButton} 
              onPress={ ()=>this.onPress(  ReportId,DBQuery)}  >
                  <Text style={item.item.ReportId === this.state.selectedId ? styles.selectedText :styles.text}>{ReportName}</Text>
              </TouchableOpacity>
            
        )

    }
    
  
      
     
    

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { 
           
          selected: true,
          SelectedButton: '',
          refreshing:false,
          selectedId: null,
          enablePTR:true,
          update:false,
          dashboard:[],
          updateRequired:false
          
         };
        
      }



 
     
 
    


    componentDidMount()
    {
     
      if(this.props.dashboard.length==0)
      {

      this.props.getBusinessStratTime()
      }
      else{
       

       
        
        this.onPress(this.props.reportId, this.props.dbQuery)
        this.setState({
          dashboard:this.props.dashboard
        })
        this.props.getBusinessStratTime(false)
        
      }
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction

      )
          

       
        
   

    }

    componentWillUnmount() {
    
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      
      if((this.props.reportId!==null && this.state.selected) || prevProps.dashboard!=this.props.dashboard || prevProps.updateRequired!=this.props.updateRequired )
      {
        console.log('report id')
        this.setState(
          {
            selectedId:this.props.reportId,
            selected:false,
            dashboard:this.props.dashboard,
            updateRequired:this.props.updateRequired,
         

          }
        )
      }
    }

    handleRestart=()=> {
      this.props.handleError();
      store.dispatch({ type: types.RESET_UI });
      store.dispatch({ type: types.CLEAR_TOKEN });
      asyncStorageHandler.setItem(Constants.LOGIN_TOKEN,null);

      NavigationService.reset({
          index: 0,
          actions: [NavigationService.navActions("SplashScreen")]
        })

  }




  
    renderLoader=()=>
     {


      
      if(this.state.updateRequired)
      {
        return(
        
       Alert.alert(
         "Please Update",
         "Refresh the app",
         [
           
           { text: "Refresh", onPress: () => {
           
             this.setState(
               {
                 updateRequired:false
               }
             )
             this.props.handleDashboardUpdate(false)
             this.onPress(this.props.reportId, this.props.dbQuery)
            
            
             
           
              
           } }
         ],
         { cancelable: false }
       )
        )

      }
        // console.log("loading properties" + this.props.loading)
         if(this.props?.loading && !this.state?.refreshing&&!this.state?.update)
         {
            // console.log('loading');
             return <Spinner loading={true}  />
             
         }
         if(this.props?.error&&!this.state?.update)
         
         {
             
            if(this.props?.errorCode!=ParafaitServer.ERROR_TYPES.NONE)
            {
                switch (this.props.errorCode) {
                  case ParafaitServer.ERROR_TYPES.BAD_REQUEST:
                    GenericMethods.showAlertWithOk(this?.props?.error?.message, ()=>this.props.handleError());
                    break;
                    case ParafaitServer.ERROR_TYPES.REQUEST_TIMEOUT:
                        GenericMethods.showErrorAlertWithOk( Constants.UNKNOWN_ERROR_MESSAGE, ()=>()=>this.handleRestart())
                          break;
                    case ParafaitServer.ERROR_TYPES.UNAUTHORIZED:
                        // GenericMethods.showErrorAlertWithRestart(Constants.SESSION_EXPIRE_MESSAGE, ()=>this.handleRestart());
                        this.handleRestart()
                         break;
                    case ParafaitServer.ERROR_TYPES.USER_DEFINED_ALERT:
                       GenericMethods.showAlertWithOk(Constants.DASHBOARD_NOTFOUND_ERROR, ()=>this.props.handleError());
                       break;
                    case ParafaitServer.ERROR_TYPES.FORBIDDEN:
                        GenericMethods.showAlertWithOk(this.props?.error?.message, ()=>this.props.handleError());
                        break;    
                    case ParafaitServer.ERROR_TYPES.NONE:
                        GenericMethods.showAlertWithOk(this.props?.error?.message, ()=>this.props.handleError());
                        break;
                    case ParafaitServer.ERROR_TYPES.NOT_FOUND:
                        GenericMethods.showAlertWithOk(this.props?.error?.message, ()=>this.props.handleError());
                        break;
                    default:
                        GenericMethods.showErrorAlertWithRestart(Constants.UNKNOWN_ERROR_MESSAGE, ()=>this.handleRestart());
                        
                }
            }
            
           
         }

        
     }



  

onMessage = e => {
    
  JSON.parse(e.nativeEvent.data)
   
   if (JSON.parse(e.nativeEvent.data).scrollTop === 0 && !this.state.enablePTR) {
       this.setState({enablePTR: true});
   } else if (JSON.parse(e.nativeEvent.data).scrollTop > 10 && this.state.enablePTR) {
       this.setState({enablePTR: false, refreshing:false});
   }
 }

      
     

    


    render() {

   

      



        
        return(
          
         
            <View style={{backgroundColor:'#fff', flex:1,flexDirection:"column", height:'100%'  }}>
                 {this.renderLoader()}
             <View style={{backgroundColor:'#fff', justifyContent:'space-between', paddingLeft:vh}}>


            {this.state.dashboard.length?
            (
            <FlatList   showsHorizontalScrollIndicator= {false} horizontal 
            data={this.state.dashboard} 
            extraData={
              this.state.selectedId  }
            renderItem={this.renderItem} 
             keyExtractor={item => item.ReportName}
            
            />):null
            }
            
           </View>
           
          <ScrollView  nestedScrollEnabled   automaticallyAdjustContentInsets={true} contentContainerStyle ={{
              flex:1,
              height:'100%'
          }} 


//  style={{
   
//   ...Platform.select({
//       android: {
//          flex:1
//       }})
              
    
//     }}
    refreshControl={
      <RefreshControl refreshing={ this.state.refreshing} onRefresh={this.onRefresh} enabled={Platform.OS === "ios" ? true : this.state.enablePTR}/>
    }
    >
     

      {/* <View  style={{  padding:10, backgroundColor:'white', flex:1, height: 213*vh }}> */}
     {
        (!this.state.updateRequired)?

      (
       
      <WebView
          
          nestedscrollEnabled
          // ref={ref => (this.webview = ref)}
           source={{ uri: this.props.webview}}
           onLoadEnd={this.onLoadEnd}
           style={{ padding:10, backgroundColor:'transparent', flex:1, height: 213*vh, marginBottom:20}}
          //  onNavigationStateChange={this.handleWebViewNavigationStateChange}
          javaScriptEnabled={true}
            ref={(b) => this._bridge = b}
            onMessage={event => this.onMessage(event)}
             injectedJavaScript={INJECTED_JS}
          
           
           
           //onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
      ):null
     }
      {/* </View> */}
         
      </ScrollView>
      </View>

     
     
           



            
            
        );
    } 
    
}

const mapStateToProps = (state) => {
   // console.log("state"+state.dashboard.dbQuery)
  
    
    


    return {
        // email: state.auth.email,
        // password: state.auth.password,
        dashboard:state.dashboard.dashboardDTO,
        sartTime:state.dashboard.startTime,
        url:state.dashboard.dbQuery,
        webview:state.dashboard.webURL,
        reportId:state.dashboard.reportId,
        reportName:state.dashboard.reportName ,
        dbQuery:state.dashboard.dbQuery,
        error: state.ui.error,
        loading: state.ui.loading,
        clientGateway:state.client.clientGateway,
        userDTO:state.user.clientAppUserLoginDTO,
        guId:state.user.deviceGUID,
        errorCode: state.ui.errorCode,
        clientDTO:state.client.clientDTO,
        updateRequired:state.dashboard.updateDashboard
        
        
       
        

    }  // gives email state  
}

const styles=StyleSheet.create({
    tabButton:{
        // backgroundcolor:'grey' ,
        borderColor:'#808080' ,  
        borderWidth:.8,
        //borderBottomWidth:.4*vw, 
        justifyContent:'center', 
        alignItems:'center' ,
        marginRight:.9*vh,
        height:3.5*vh,
        marginVertical:.5*vh,
        borderRadius:2,
        

       // flex:1,
        

    },
    selected:
    {
      justifyContent:'center', 
        alignItems:'center' ,
        marginRight:vh,
        height:3.5*vh,
        marginVertical:.5*vh,
        borderRadius:2,
      borderColor:'orange' ,
       borderWidth:2,
       

    },

    text:{
    textAlign:'center',  fontSize:(vw*vh)/2.2, paddingHorizontal:vh

    },

    selectedText:
    {
      
      textAlign:'center',  
      fontSize:(vw*vh)/2.3, 
      paddingHorizontal:vh,
      fontWeight:'bold'
      
    }

})

export default connect(mapStateToProps, {getTableauDasboard, handleError, getBusinessStratTime, getTableauToken, onLoadURL,handleDashboardUpdate})(HomeScreen);
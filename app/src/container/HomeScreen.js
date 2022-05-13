import React, {Component}from 'react'
import {View, Text, FlatList,PlatForm,TouchableHighlight, TouchableWithoutFeedback, Button, TouchableOpacity,RefreshControl, StyleSheet,BackHandler,Alert,ScrollView, Linking} from  'react-native'
import { connect } from 'react-redux'
import {getTableauDashboard, getBusinessStartTime,getTableauToken, getSalesDashboard, onLoadURL,fetchDataFromBackground,handleDashboardUpdate} from  '../redux/actions/dashboardActions'
import { ParafaitServer } from '../constants/ParafaitServer'
import {store} from '../../index'
import  {HeaderIcon, HeaderTitle, Spinner, DashboardActivityCard} from '../components/index'
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
import  Icon from 'react-native-vector-icons/Ionicons'


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
      

      headerRight: ()=> <HeaderIcon/>

      
      
    
    }

    backAction = () => {
      if(this.state.showTodayReport){
        this.setState({
          showTodayReport:false
        })
        return true;
      }
      else if(this.state.showWeekReport){
        this.setState({
          showWeekReport:false
        })
        return true;
      }
      else{
          
          
          GenericMethods.showAlertWithCancel(Constants.MSG,  () => BackHandler.exitApp(), () => null )
          return true;
        }
      };

      handleSelection = (id) => {

        
     
        
      this.setState({selectedId: id})
     }




      onPress( ReportId, DBQuery)
      {
       
        this.handleSelection(ReportId)
        if(ReportId!=-1) 
        {
          this.setState({
            showHome:false,
            showWebView:true,
            showWeekReport:false,
            showTodayReport:false
          })
          this.props.getTableauToken(ReportId,DBQuery)
        }
        else{

          this.setState({
            showHome:true,
            showWebView:false
          })

          
        }
      }

    


      onRefresh =()=> {
        this.setState(
          {
            refreshing: true
           
          }
        )

      if(this.props.reportId!=-1)
      {
        this.props.getTableauToken(store.getState().dashboard.currentReportId,store.getState().dashboard.currentdbQuery)
      }
     



      }

      onLoadEnd = () =>
      {
        
        this.props.onLoadURL()
        this.setState({refreshing: false})
      }
      

    
    
      renderItem=(item)=>{
        const {ReportName,DBQuery,ReportId  }=item.item


       
       
        
       
        return(
           
               
              <TouchableOpacity  style={item.item.ReportId === this.state.selectedId ? styles.selected :styles.tabButton} 
              onPress={ ()=> { this.onPress(  ReportId,DBQuery)}}  >
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
          updateRequired:false,
          showReport:false,
          showHome:true,
          showTodayReport:false,
          showWeekReport:false,
          showWebView:false,
          showTodayPos:false,
          showWeekPos:false,
          selectedSite:null
          
         };
        
      }



 
     
 
    


    componentDidMount()
    {
      
     
      if(this.props.dashboard.length==0)
      {

      this.props.getBusinessStartTime()
      this.props.getSalesDashboard()
      }
      else{
       

       
        
       // this.onPress(this.props.reportId, this.props.dbQuery)
        this.setState({
          dashboard:this.props.dashboard
        })
        this.props.getBusinessStartTime(false)
        this.props.getSalesDashboard()
        
      }
       BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction

      )
          

       
        
   

    }

    componentWillUnmount() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.backAction

      )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      
      if((this.props?.reportId!=null&&  this.props?.reportId!=prevProps.reportId) ) //|| prevProps.updateRequired!=this.props.updateRequired || prevProps.dashboard!=this.props.dashboard
      {
        
        this.setState(
          {
            selectedId:this.props.reportId,
            selected:false,
            dashboard:this.props.dashboard,
            // updateRequired:this.props.updateRequired,
         

          }
        )
      }
    }

    handleRestart=()=> {
      this.props.handleError();
      store.dispatch({ type: types.RESET_UI });
      store.dispatch({ type: types.CLEAR_TOKEN });
      store.dispatch({type:types.SET_TOKEN, payload:null})
      asyncStorageHandler.setItem(Constants.LOGIN_TOKEN,null);

      NavigationService.reset({
          index: 0,
          actions: [NavigationService.navActions("SplashScreen")]
        })

  }




  
    renderLoader=()=>
     {


      
      // if(this.state.updateRequired)
      // {
      //   return(
        
      //  Alert.alert(
      //    "Please Update",
      //    "Refresh the app",
      //    [
           
      //      { text: "Refresh", onPress: () => {
           
      //        this.setState(
      //          {
      //            updateRequired:false
      //          }
      //        )
      //        this.props.handleDashboardUpdate(false)
      //        this.onPress(this.props.reportId, this.props.dbQuery)
            
            
             
           
              
      //      } }
      //    ],
      //    { cancelable: false }
      //  )
      //   )

      // }
        // console.log("loading properties" + this.props.loading)
         if(this.props?.loading && !this.state?.refreshing)
         {
            // console.log('loading');
             return <Spinner loading={true}  />
             
         }
         if(this.props?.error)
         
         {
           console.log("error at home ")
             
            if(this.props?.errorCode!=ParafaitServer.ERROR_TYPES.NONE)
            {
                switch (this.props?.errorCode) {
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


 onTodayLayoutPress=()=>{
   {
     this.setState(
       {
         showTodayReport:true
       }
     )
   }
 }

 onWeekLayoutPress=()=>{
  this.setState(
    {
      showWeekReport:true
    }
  )

 }

 renderPosMachines=({item})=>{
   const {PosMachine,CollectionToday,CollectionPreviousDay,CollectionWeek,CollectionPreviousWeek}=item;
    return(
            <View style={styles.posMachineContainer}>
                  <Text style={styles.posMachineText} >{PosMachine}</Text>
                  <TouchableOpacity  style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <View style={[styles.posCollectionView, {backgroundColor:'#B0B0B0'}]}>
                      <Text style={[styles.siteCollectionText,{color:'#F8F8F8'}]}>$ {CollectionPreviousDay}</Text>
                      <Text style={[styles.siteConsumptionText,{color:'#F8F8F8'}]}>{Constants.COLLECTION}</Text>
                    </View>
                    <View style={[styles.posCollectionView, { backgroundColor:'#909090'}]}>
                        <Text style={[styles.siteCollectionText,{color:'#F8F8F8'}]}>$ {CollectionToday}</Text>
                        <Text style={[styles.siteConsumptionText,{color:'#F8F8F8'}]}>{Constants.COLLECTION}</Text>
                    </View>
                  </TouchableOpacity>
              </View>
    )


 }

 renderPosMachinesWeek=({item})=>{
  const {PosMachine,CollectionToday,CollectionPreviousDay,CollectionWeek,CollectionPreviousWeek}=item;
   return(
           <View style={styles.posMachineContainer}>
                 <Text style={styles.posMachineText} >{PosMachine}</Text>
                 <TouchableOpacity  style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                   <View style={[styles.posCollectionView, {backgroundColor:'#B0B0B0'}]}>
                     <Text style={[styles.siteCollectionText,{color:'#F8F8F8'}]}>$ {CollectionPreviousWeek}</Text>
                     <Text style={[styles.siteConsumptionText,{color:'#F8F8F8'}]}>{Constants.COLLECTION}</Text>
                   </View>
                   <View style={[styles.posCollectionView, { backgroundColor:'#909090'}]}>
                       <Text style={[styles.siteCollectionText,{color:'#F8F8F8'}]}>$ {CollectionWeek}</Text>
                       <Text style={[styles.siteConsumptionText,{color:'#F8F8F8'}]}>{Constants.COLLECTION}</Text>
                   </View>
                 </TouchableOpacity>
             </View>
   )


}


 renderListItem =({item})=>{

  const {CollectionPreviousDay,CollectionToday,CollectionWeek,GamePlayPreviousDay,GamePlayPreviousWeek, GamePlayToday, GamePlayWeek,SiteId,SiteName, PosCollections }=item;

 
 

 return( 
   
      <View style={styles.flatListContainer}>
        <Text style={styles.siteText} >{SiteName}</Text>
        <TouchableOpacity  style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} 
        onPress={
          ()=>this.setState(prevState =>{
            console.log("site id", SiteId)
          return{
                
            showTodayPos: !prevState.showTodayPos,
          
            selectedSite: prevState.selectedSite!==SiteId?SiteId:null
          }
})} 

>
          <View style={styles.siteCollectionView}>
            <Text style={styles.siteCollectionText}>$ {CollectionPreviousDay}</Text>
            <Text style={styles.siteConsumptionText}>{Constants.COLLECTION}</Text>
            <View style={{margin:2.5}}></View>
            <Text style={styles.siteCollectionText}>$ {GamePlayPreviousDay}</Text>
            <Text style={styles.siteConsumptionText}>{Constants.CONSUMPTION}</Text>

          </View>
          <View style={[styles.siteCollectionView, { backgroundColor:'#DCDCDC'}]}>
              <Text style={styles.siteCollectionText}>$ {CollectionToday}</Text>
              <Text style={styles.siteConsumptionText}>{Constants.COLLECTION}</Text>
              <View style={{margin:2.5}}></View>
              <Text style={styles.siteCollectionText}>$ {GamePlayToday}</Text>
              <Text style={styles.siteConsumptionText}>{Constants.CONSUMPTION}</Text>

          </View>
        </TouchableOpacity>
        {(PosCollections?.length>0 && this.state.showTodayPos && this.state.selectedSite==SiteId )?
        (
          <View>
            <FlatList         
                data={PosCollections}
                renderItem={this.renderPosMachines}
                keyExtractor={item => item.PosMachine.toString()}


            />
          
          </View>

        ):null
        }
      </View>
    
 )
   

 }



 
 renderListItemWeek =({item})=>{

  const {CollectionPreviousDay,CollectionToday,CollectionWeek,GamePlayPreviousDay,GamePlayPreviousWeek, GamePlayToday, GamePlayWeek,SiteId,SiteName, PosCollections }=item;
 

 return( 
   
      <View style={styles.flatListContainer}>
        <Text style={styles.siteText} >{SiteName}</Text>
        <TouchableOpacity   style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState(prevState =>{
   return{
        
    // showWeekPos: !prevState.showWeekPos,
    selectedSite: prevState.selectedSite!=SiteId?SiteId:null
   }
})}>
          <View style={styles.siteCollectionView}>
            <Text style={styles.siteCollectionText}>$ {GamePlayPreviousWeek}</Text>
            <Text style={styles.siteConsumptionText}>{Constants.COLLECTION}</Text>
            <View style={{margin:2.5}}></View>
            <Text style={styles.siteCollectionText}>$ {GamePlayPreviousWeek}</Text>
            <Text style={styles.siteConsumptionText}>{Constants.CONSUMPTION}</Text>

          </View>
          <View style={[styles.siteCollectionView, { backgroundColor:'#DCDCDC'}]}>
              <Text style={styles.siteCollectionText}>$ {CollectionWeek}</Text>
              <Text style={styles.siteConsumptionText}>{Constants.COLLECTION}</Text>
              <View style={{margin:2.5}}></View>
              <Text style={styles.siteCollectionText}>$ {GamePlayWeek}</Text>
              <Text style={styles.siteConsumptionText}>{Constants.CONSUMPTION}</Text>

          </View>
        </TouchableOpacity>
        {(PosCollections?.length>0 && this.state.selectedSite==SiteId )?
        (
          <View>
            <FlatList         
                data={PosCollections}
                renderItem={this.renderPosMachinesWeek}
                keyExtractor={item => item.PosMachine.toString()}


            />
          
          </View>

        ):null
        }
      </View>
    
 )
   

 }

      
     

    


    render() {
      
      console.log("site list ", JSON.stringify(this.props.siteList))

      

      

      const {CollectionToday,GamePlayToday,GamePlayWeek,CollectionWeek}=this.props?.totalCollection

      

      

      



        
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
           
          <ScrollView  scrollEnabled={false} nestedScrollEnabled   automaticallyAdjustContentInsets={true} contentContainerStyle ={{
              flex:1,
              height:'100%'
          }} 


    
    refreshControl={
      <RefreshControl refreshing={ this.state.refreshing} onRefresh={this.onRefresh} enabled={ this.state.showWebView?Platform.OS === "ios" ? true : this.state.enablePTR:false}/>
    }
    >
    {
    (this.state.showHome)?
     (<View style={{flexDirection:'row', justifyContent:'space-evenly', alignItems:'center' }}>
      <Text style={{fontSize:14, alignSelf:'center',paddingTop:10, paddingLeft:10}}>{this.props.currentDate}</Text>
      <Icon onPress={()=>this.props.getSalesDashboard()} name="refresh-circle"  size={vw*7} color='#000' style={{alignSelf:'center',paddingTop:10,paddingRight:10}} />
    </View>)
    :null
    }
   
     {
        (this.state.showWebView)?

      (
       
      <WebView
          
          nestedscrollEnabled
        
           source={{ uri: this.props.webview}}
           onLoadEnd={this.onLoadEnd}
           style={{ padding:10, backgroundColor:'transparent', flex:1, height: 213*vh, marginBottom:20}}
         
          javaScriptEnabled={true}
            ref={(b) => this._bridge = b}
            onMessage={event => this.onMessage(event)}
             injectedJavaScript={INJECTED_JS}
          
           
           
           
      />
      ):
      (!this.state.showTodayReport&&!this.state.showWeekReport)?
      (
        <View style={{flex:1}}>
          {/* <Text style={{fontSize:12, alignSelf:'center',paddingTop:10, paddingHorizontal:10}}>{this.props.currentDate}</Text> */}
          <View style={{flex:1, alignItems:'center', justifyContent:'space-between',padding:10,}}>
            <DashboardActivityCard collectionAmt={CollectionToday} consumptionAmt={GamePlayToday} collectionText={Constants.COLLECTION} consumptionText={Constants.CONSUMPTION}  cardTitle={Constants.TODAY} onPress={this.onTodayLayoutPress}/>
            <DashboardActivityCard collectionAmt={CollectionWeek} consumptionAmt={GamePlayWeek} collectionText={Constants.COLLECTION} consumptionText={Constants.CONSUMPTION}  cardTitle={Constants.WEEK} onPress={this.onWeekLayoutPress}/>
            
          </View>
        </View>
      ):
      (this.state.showTodayReport)?
      (
        <View style={{flex:1, backgroundColor:'#C0C0C0'}}> 
          <View style={[styles.siteCollectionView,{flexDirection:'row', padding:15, backgroundColor:'grey'}]}>
                <Text style={{fontSize:16, color:'white', fontWeight:'bold', alignSelf:'center'}}>{Constants.YESTERDAY}</Text>
                <Text style={{fontSize:16, color:'white', fontWeight:'bold', alignSelf:'center'}}>{Constants.CURRENT_DAY}</Text>

              </View>
              <FlatList
              nestedScrollEnabled
                data={this.props.siteList}
                renderItem={this.renderListItem}
                keyExtractor={item => item.SiteId.toString()}
            />
          </View>
            
            

         

   
      ):
      (this.state.showWeekReport)?
      (
        <View style={{flex:1, backgroundColor:'#C0C0C0'}}> 
          <View style={[styles.siteCollectionView,{flexDirection:'row', padding:15, backgroundColor:'grey'}]}>
              <Text style={{fontSize:16, color:'white', fontWeight:'bold', alignSelf:'center'}}>{Constants.LAST_WEEK}</Text>
              <Text style={{fontSize:16, color:'white', fontWeight:'bold', alignSelf:'center'}}>{Constants.THIS_WEEK}</Text>

            </View>
          
              <FlatList
              nestedScrollEnabled
                data={this.props.siteList}
                renderItem={this.renderListItemWeek}
                keyExtractor={item => item.SiteId.toString()}
            />
          </View>

      ):null

     }
    
         
      </ScrollView>
      </View>

     
     
           



            
            
        );
    } 
    
}

const mapStateToProps = (state) => {
   
  
    
    


    return {
       
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
        updateRequired:state.dashboard.updateDashboard,
        totalCollection:state.dashboard.totalCollection,
        siteList:state.dashboard.siteList,
        currentDate:state.dashboard.currentDate
        
        
       
        

    }   
}

const styles=StyleSheet.create({
    tabButton:{
        borderColor:'#808080' ,  
        borderWidth:.8,
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
      
    },
    listContainer: {
      flex: 1,
      marginTop: 10 || 0,
    },
    item: {
  
      padding: 5,
      flex:1,
       marginVertical: 5,
       justifyContent:'space-evenly'
     
    },
    title: {
      fontSize: 15,
      textAlign:'left',
      alignSelf:'flex-start'
    },

    flatListContainer:{
      flex:1,
      padding:5,
      paddingHorizontal:0,
      justifyContent:'space-evenly',
      backgroundColor:'#C0C0C0',

    },

    siteText:{
        fontSize:18,
        fontWeight:'bold',
      
    },

    siteCollectionView:{
      flex:1,
      justifyContent:"space-evenly",
      padding:5,
      alignItems:'center',
      
     backgroundColor:'#FFFAFA',
     

    },
    siteCollectionText:{fontSize:20,color:"#1E90FF",fontWeight:'bold'},

    siteConsumptionText:{fontSize:14},
   

    posMachineContainer:{
      flex:1,
      paddingTop:2,
      marginHorizontal:2,
      justifyContent:'space-evenly',
      backgroundColor:'#303030',

    },

    posMachineText:{
      fontSize:16,
      fontWeight:'bold',
      color:'#F8F8F8'
    
  },

  posCollectionView:{
    flex:1,
    justifyContent:"space-evenly",
    padding:2,
    alignItems:'center',
    
   backgroundColor:'#FFFAFA',
   

  },
    

})

export default connect(mapStateToProps, {getTableauDashboard, getSalesDashboard, handleError, getBusinessStartTime, getTableauToken, onLoadURL,handleDashboardUpdate})(HomeScreen);
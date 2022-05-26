
import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, FlatList} from 'react-native';
import * as  Constants from '../constants';
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');




const  DashboardCollection= ({siteList, onPress, siteId, pastCollectionText, currentCollectionText }) => {

    


    const renderPosMachines=({item})=>{
        const {PosMachine,PresentPosCollection,
            PastPosCollection,
            PresentPosConsumption,
            PreviousPosConsumption, PosCollectionToday,CollectionPreviousDay,CollectionWeek,CollectionPreviousWeek}=item;
         return(
                 <View style={styles.posMachineContainer}>
                       <Text style={styles.posMachineText} >{PosMachine}</Text>
                       <TouchableOpacity  style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                         <View style={[styles.posCollectionView, {backgroundColor:'#B0B0B0'}]}>
                           <Text style={[styles.siteCollectionText,{color:'#F8F8F8'}]}>$ {PastPosCollection}</Text>
                           <Text style={[styles.siteConsumptionText,{color:'#F8F8F8'}]}>{Constants.COLLECTION}</Text>
                         </View>
                         <View style={[styles.posCollectionView, { backgroundColor:'#909090'}]}>
                             <Text style={[styles.siteCollectionText,{color:'#F8F8F8'}]}>$ {PresentPosCollection}</Text>
                             <Text style={[styles.siteConsumptionText,{color:'#F8F8F8'}]}>{Constants.COLLECTION}</Text>
                         </View>
                       </TouchableOpacity>
                   </View>
         )
     
     
      }

     const RenderItem =({item,onPress,siteId})=>{

        const {PastCollection,PresentCollection,
            PresentConsumption,
            PastConsumption,CollectionWeek,GamePlayPreviousDay,GamePlayPreviousWeek, GamePlayToday, GamePlayWeek,SiteId,SiteName, PosCollections }=item;
      
       
       
      
       return( 
         
            <View style={styles.flatListContainer}>
              <Text style={styles.siteText} >{SiteName}</Text>
              <TouchableOpacity  style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} 
              onPress={()=>onPress(SiteId)} 
      
      >
                <View style={styles.siteCollectionView}>
                  <Text style={styles.siteCollectionText}>$ {PastCollection}</Text>
                  <Text style={styles.siteConsumptionText}>{Constants.COLLECTION}</Text>
                  <View style={{margin:2.5}}></View>
                  <Text style={styles.siteCollectionText}>$ {PastConsumption}</Text>
                  <Text style={styles.siteConsumptionText}>{Constants.CONSUMPTION}</Text>
      
                </View>
                <View style={[styles.siteCollectionView, { backgroundColor:'#DCDCDC'}]}>
                    <Text style={styles.siteCollectionText}>$ {PresentCollection}</Text>
                    <Text style={styles.siteConsumptionText}>{Constants.COLLECTION}</Text>
                    <View style={{margin:2.5}}></View>
                    <Text style={styles.siteCollectionText}>$ {PresentConsumption}</Text>
                    <Text style={styles.siteConsumptionText}>{Constants.CONSUMPTION}</Text>
      
                </View>
              </TouchableOpacity>
              {(PosCollections?.length>0 &&siteId==SiteId )?
              (
                <View>
                  <FlatList         
                      data={PosCollections}
                      renderItem={renderPosMachines}
                      keyExtractor={item => item.PosMachine.toString()}
      
      
                  />
                
                </View>
      
              ):null
              }
            </View>
          
       )


         
      
       }
  return (
  
    <View style={{flex:1, backgroundColor:'#C0C0C0'}}> 
    <View style={[styles.siteCollectionView,{flexDirection:'row', padding:15, backgroundColor:'grey'}]}>
          <Text style={{fontSize:16, color:'white', fontWeight:'bold', alignSelf:'center'}}>{pastCollectionText}</Text>
          <Text style={{fontSize:16, color:'white', fontWeight:'bold', alignSelf:'center'}}>{currentCollectionText}</Text>
    
        </View>
        <FlatList
        nestedScrollEnabled
          data={siteList}
          renderItem={({ item }) => <RenderItem item={item} onPress={onPress} siteId={siteId} />}
        //   renderItem={renderListItem}
          keyExtractor={item => item.SiteId.toString()}
      />
    </View>
    
  );
};



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



export {DashboardCollection}
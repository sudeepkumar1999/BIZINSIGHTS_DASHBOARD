import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';



const  DashboardActivityCard= ({collectionAmt,collectionText, consumptionAmt, consumptionText, cardTitle, onPress, currencySymbol}) => {
  return (
  
       <TouchableOpacity style={styles.container} onPress={onPress}>
          <Text style={styles.cardTitle}>{cardTitle}</Text>
            <View style={styles.collectionView}>
                <View style={styles.collectionContainer}>
                   <Text style={styles.collectionAmtText}>{currencySymbol} {collectionAmt}</Text>
                    <View style={styles.lineView}></View>
                    <Text style={styles.collectionText} >{currencySymbol} {collectionText}</Text>
                </View>
                <View style={styles.collectionContainer}>
                    <Text style={styles.collectionAmtText}>$ {consumptionAmt}</Text>
                    <View style={styles.lineView}></View>
                    <Text style={styles.collectionText} >{consumptionText}</Text>
                </View>
             </View>
        </TouchableOpacity>
    
  );
};


const  SiteCollectionCard= ({yCollectionAmt,yCollectionText, yConsumptionAmt, yConsumptionText, yCardTitle, onPress}) => {
    return (
    
         <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.cardTitle}>{cardTitle}</Text>
              <View style={styles.collectionView}>
                  <View style={styles.collectionContainer}>
                     <Text style={styles.collectionAmtText}>$ {collectionAmt}</Text>
                      <View style={styles.lineView}></View>
                      <Text style={styles.collectionText} >{collectionText}</Text>
                      <Text style={styles.collectionAmtText}>$ {consumptionAmt}</Text>
                      <View style={styles.lineView}></View>
                      <Text style={styles.collectionText} >{consumptionText}</Text>
                  </View>
                  <View style={styles.collectionContainer}>
                      <Text style={styles.collectionAmtText}>$ {consumptionAmt}</Text>
                      <View style={styles.lineView}></View>
                      <Text style={styles.collectionText} >{consumptionText}</Text>
                  </View>
               </View>
          </TouchableOpacity>
      
    );
  };

export const styles= StyleSheet.create(
    {
        container:{
            flex:1, 
            width:'100%',
             height:'100%', 
             padding:10, 
             paddingHorizontal:15 ,
             backgroundColor:'orange', 
              marginBottom:10, 
              borderWidth:.1,
              borderRadius:10

        },

        cardTitle:{
            alignSelf:'center', 
            fontSize:30, 
            color:'white', 
            fontWeight:'bold'
        },

        collectionContainer:{
            
            flex:1, 
            width:'100%', 
            backgroundColor:'white', 
            paddingVertical:10, 
            alignItems:'center', 
            justifyContent:'space-evenly', 
            marginBottom:10 
         },

         collectionView:{
           
            flex:1, 
            marginTop:10 , 
            justifyContent:'space-evenly', 
            width:'100%', 
            height:'100%', 
            alignItems:'center'
        },

        collectionAmtText:{  alignSelf:'center', 
        fontSize:30, 
        color:'blue', 
        fontWeight:'normal'
        },

        lineView:{
            height:1, 
            backgroundColor:'blue', 
            width:'100%'
        },
        collectionText:{
             alignSelf:'center', 
             fontSize:18, 
             fontWeight:'normal'
        }






    }
)



export {DashboardActivityCard, SiteCollectionCard}
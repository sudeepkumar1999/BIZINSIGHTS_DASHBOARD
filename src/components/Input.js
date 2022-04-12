
import React , {Component} from 'react'
import  { View, StyleSheet ,Text, TextInput, Dimensions} from 'react-native'
import { Value } from 'react-native-reanimated';

var {vw, vh, vmin, vmax} = require('react-native-viewport-units');
const Input=({ placeholder,value,onChangeText,secureTextEntry})=> {
    return(
        
        <TextInput style={styles.textInput}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            autoCapitalize= "none"
            autoCorrect={false}
            autoCorrect={false}
            secureTextEntry={secureTextEntry}  
            placeholderTextColor="#000"
         />
        

        
    )



}

const styles=StyleSheet.create({
    
    
    textInput:
    {
        width:'100%',
        height:5*vh,
        backgroundColor:'#fff',
        lineHeight:2.85*vw,
        textAlign:'center',
        fontSize:2.8*vw,
        color:'#000',
        marginBottom:.8*vh,
        borderWidth:.5

        
       
        

    }

})

export {Input}
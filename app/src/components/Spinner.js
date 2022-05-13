import React from 'react'
import { View ,ActivityIndicator, Modal, Text, StyleSheet} from 'react-native'
import * as GenericMethods from '../common/index'
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

const Spinner=({loading})=>{
const onModalBack = () => {  }
    return(


<Modal

transparent={true}
animationType='none'
visible={loading}
onRequestClose={onModalBack}>
<View style={styles.modalBackground}>
<View style={styles.activityIndicatorWrapper}>
<ActivityIndicator
animating={loading}
size='small'
color="black" />

</View>
</View>
</Modal>
)
}


  

    
const styles = StyleSheet.create({
    modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    },
    activityIndicatorWrapper: {
    backgroundColor: '#f2f2f2',
    height: 5*vh,
    width: 5*vh,
    borderRadius:20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    }
})

export {Spinner}
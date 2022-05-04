/**
 * @format
 */

import {AppRegistry,Text, View} from 'react-native';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './src/redux/reducers'
import React , {Component} from 'react'
import AppContainer from './AppContainer';
import {name as appName} from './app.json';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react'

// const persistConfig = {
//   key: 'root',
//   storage:AsyncStorage,
//   stateReconciler:autoMergeLevel2,
//   whiteList:['deviceInfo', 'user','dashboard', 'client'],
//   blacklist: ['asyncStore', 'update', 'ui']
  
// }

//const persistedReducer = persistReducer(persistConfig, reducers);
export const store =createStore(reducers, {},  applyMiddleware(ReduxThunk));
const  persistor = persistStore(store)




function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
    
      return null;
    }
  
    return <App />;
  }

  



class App extends Component {

    render()
    {
     
      
   
     
      
        return(
          <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
              <AppContainer/>
            {/* </PersistGate> */}
          </Provider>
          

        )
    }
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);

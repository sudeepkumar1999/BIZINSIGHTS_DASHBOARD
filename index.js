/**
 * @format
 */

import {AppRegistry,Text, View} from 'react-native';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducers from './src/redux/reducers'
import React , {Component} from 'react'
import AppContainer from './AppContainer';
import {name as appName} from './app.json';
// import AppStatusBar from './src/components/AppStatusBar'



function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <App />;
  }

  export const store =createStore(reducers, {}, applyMiddleware(ReduxThunk));

  // const THEME_COLOR='grey'

class App extends Component {

    render()
    {
      let val=store.getState();
      
   
     
      
        return(
          <Provider store={store}>
            <AppContainer/>
          </Provider>
          

        )
    }
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);

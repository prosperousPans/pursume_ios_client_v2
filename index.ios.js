import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { 
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
} from 'react-native';

import configureStore from './iosClient/src/configureStore';
import Login from './iosClient/src/components/Login';
import Main from './iosClient/src/components/Main';
import Profile from './iosClient/src/components/Profile/Profile';

const PursumeIOSApp = () => (
  <Provider store = { store }>
    <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '',
          component: Login
        }}
        navigationBarHidden={true}
         />
  </Provider>    
)

const store = configureStore();

AppRegistry.registerComponent('TestProject', () => PursumeIOSApp);

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  }
});

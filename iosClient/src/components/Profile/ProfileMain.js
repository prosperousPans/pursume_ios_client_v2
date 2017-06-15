import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  NavigatorIOS
} from 'react-native';

import {
  StackNavigator
} from 'react-navigation';

import Profile from './Profile'

class ProfileMain extends Component {
  constructor (props){
    super(); 
  }

  render() {
      return (
        <NavigatorIOS
          initialRoute={{
            component: Profile,
            title:''
          }}
        //to hide nav bar
        navigationBarHidden={true}
        style={{width: 375, height: 700}}
         />
      )
    }
}

module.exports = ProfileMain;

// navigationBarHidden={true}
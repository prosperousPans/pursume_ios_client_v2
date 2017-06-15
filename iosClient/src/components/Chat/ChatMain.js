import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  NavigatorIOS
} from 'react-native';
import ChatList from './ChatList'

class ChatMain extends Component {
  constructor (props){
    super();
  }
  
  render() {
      return (
        <NavigatorIOS
          initialRoute={{
            component: ChatList,
            title:''
          }}
        navigationBarHidden={true}
        style={{width: 375, height: 700}}
         />
      )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    },
    text: {
      fontSize: 24,
      marginTop: 300,
      color: 'black',
      alignSelf: 'center'
  }
});

module.exports = ChatMain;
import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  Image
} from 'react-native';
import Chat from './Chat';
import Separator from '../Utilities/Separator.js';
import axios from 'axios';

class ChatList extends Component {
  constructor (props){
    super();
    this.state = {
      chatConnections: []
    }
  }

  componentWillMount(){    
    this.getChatUsersList();
  }

  async getChatUsersList(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var authid = result[0][1];
        var config = {
          headers:{'Authorization': 'Bearer '+ result[1][1] }
        }
        axios.get('http://localhost:3000/chat-list?authid='+ authid, config)
        .then( result => {
          this.setState({
            chatConnections: result.data.rows
          })
        })
        .catch((error) => {
          console.error(error);
        });
      })
    }catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
  }

  goToChat(userDetails){
    this.props.navigator.push({
    component: Chat,
    title: 'Chat',
    passProps: {userDetails}
   });
  }
  
  render() {
    var chats = this.state.chatConnections;
    if(chats){
      var list = chats.map((item, index) => {
        return (
          <View key={index}>
            <View style={styles.container} >
              <TouchableHighlight
                onPress={this.goToChat.bind(this, item)}
                underlayColor='transparent'>
                <View>
                  <View style={styles.containerProfile} >
                    <Image style={styles.image} source={{uri: item.image}}/>
                    <Text style={styles.name}>{item.full_name}</Text>
                  </View>
                  <Separator/>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        )
      })
    }

    return(
      <ScrollView>
        {list}
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  containerProfile:{
      flexDirection: 'row',
      marginLeft: 10,
      padding:5,
      height: 60
  },
  container: {
    flex: 1,
    marginTop:5
  },
  image:{
    height: 40,
    borderRadius: 20,
    width: 40,
  },
  rowContainer: {
      flexDirection: 'column',
      flex: 1,
      padding: 10
  },
  name: {
      fontSize: 18,
      paddingBottom: 5,
      paddingTop:5,
      paddingLeft:20,
      fontFamily: 'Avenir-Medium'
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
  },
  backIcon:{
    margin: 10,
  },
  titleContainer:{
    flexDirection: 'row',
    margin: 5,
    padding:8,
  },
  titleText:{
    marginTop: 12,
    marginLeft: 45,
    textAlign: 'center',
    fontFamily: 'Avenir-Medium',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2196F3'
    },
});

module.exports = ChatList;
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      toUserId: this.props.userDetails.id,
      user:{
        _id:'',
        name:'',
        avatar:''
      }
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.socket = SocketIOClient('http://localhost:8000');
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  async determineUser(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var authid = result[0][1];
        var config = {
          headers:{ 'Authorization': 'Bearer '+ result[1][1] }
        }
        axios.get('http://localhost:3000/chat-list/user?authid='+ authid, config)
          .then((response) => {
            response = response.data;
            var user = {};
            user["_id"] = response.id;
            user["name"] = response.full_name;
            user["avatar"] = response.image;

            this.setState({ user: user });
            this.socket.emit('userJoined', {
              userId: user._id,
              toId: this.state.toUserId
            });
          })
          .catch((error) => {
            console.error(error);
          });

        axios.get('http://localhost:3000/chat-list/userDetails?user=' + this.state.toUserId, config)
          .then((response) => {
            response = response.data;
            var other_user = {};
            other_user["_id"] = response.id;
            other_user["name"] = response.full_name;
            other_user["avatar"] = response.image;

            this.setState({ other_user: other_user });
          })
          .catch((error) => {
            console.error(error);
          });
      })
    }catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  onReceivedMessage(messages) {
    var context = this;
    var newMsgObj = messages.map(function(message) {
      var newmessage = {};
      newmessage['_id'] = message['id'];
      newmessage['text'] = message['message'];
      newmessage['createdAt'] = message['created_at'];
      if(message.from_id===context.state.user._id)
          newmessage['user'] = context.state.user;
      else
          newmessage['user'] = context.state.other_user;
          newmessage['to_user'] = message['to_id'];
      return newmessage;
    });
    messages = newMsgObj;
    this._storeMessages(messages);
  }

  onSend(messages = []) {
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }

  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  }

  render() {
    var user = {
            _id: 1,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          };

    return (<View style = {{ width: 375, height: 600, backgroundColor: 'whitesmoke' }} >
      <GiftedChat messages = { this.state.messages }
      onSend = {this.onSend}
      user = {this.state.user}
      keyboardShouldPersistTaps = {'always'}/> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginTop: 300,
    color: 'black',
    alignSelf: 'center'
  }
})

module.exports = Chat;

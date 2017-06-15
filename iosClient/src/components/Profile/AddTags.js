import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	TouchableHighlight,
  TextInput,
  Button,
  AsyncStorage,
  ScrollView
} from 'react-native';
import Separator from '../Utilities/Separator';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

class AddTags extends Component{
  constructor (props) {
    super(props);
    this.state = {
      tags:[],
      text: ''
    }
  }

  async addTagDetails(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var config = {
          headers:{'Authorization': 'Bearer '+result[1][1] }
        }
        var options = {
          authid: result[0][1],
          text: this.state.text
        }
        axios.post('http://localhost:3000/profile-user/add-tag', options, config)
        .then( result => {
          console.log('Add Tag: ', 'Successful');
        })
        .catch( error => {
          console.log('error: ', error);
        })
      })
    }catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async deleteTagDetails(tag){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var config = {
          headers:{'Authorization': 'Bearer '+result[1][1] }
        }
        var options = {
          authid: result[0][1],
          tag: tag.tag
        }
        axios.post('http://localhost:3000/profile-user/delete-tag', options, config)
        .then( result => {
          console.log('Delete Tag results: ','Successful');
        })
        .catch( error => {
          console.log('error: ', error);
        })
      })
    }catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  componentWillMount(){
    if(this.props.tagInfo && this.props.tagInfo.data){
      this.setState({
        tags: this.props.tagInfo.data
      })
    }
  }

  handleChange(event){
    console.log('Handle Change', event.nativeEvent.text)
    this.setState({
      text: event.nativeEvent.text
    })
  }

  handleCancel(event){
    this.setState({
      text: ''
    })
  }

  handleDeleteTags(tag){
    this.deleteTagDetails(tag);
  }

  handleOk(event){
    this.addTagDetails();
  }

  handleBack(tag){
    this.props.navigator.pop();
  }

  render(){
    const backIcon = (<Icon name="arrow-circle-left" size={30} color="#2196F3" />)
    var TagsVerbiage = "Help us show you relevant matches! Enter your fields, skills or passions";
    var tagValues = this.state.tags;
    var context= this;
    var list = tagValues.map(function(tag, index){

      if(tagValues.length === 0){
        return <View key={index}/>
      } else {
        return (
          <View key={index} >
            <View style={styles.tagRowContainer}>
              <View style={styles.tagContainer}><Text>#</Text><Text style={styles.tagContent}>{tag.tag}</Text></View>
              <TouchableHighlight onPress={ ()=>{context.handleDeleteTags(tag)}}>
              <Text style={styles.deleteTag}>Delete</Text>
              </TouchableHighlight>
            </View>
            <Separator/>  
          </View>
        )
      }
    })
  	return(
      <ScrollView style={styles.container}>
        <View style={styles.titleRowContainer}>
          <TouchableHighlight 
          style={styles.backIcon}
          onPress={()=>{this.handleBack()}}>
            <Text>{backIcon}</Text>
          </TouchableHighlight>
          <Text style={styles.titleText}>Your Interests</Text>
        </View>
        <Text style={styles.TagsVerbiage}>{TagsVerbiage}</Text>
        <View style={styles.skillsContainer}>
          <TextInput 
          style={styles.searchInput}
          placeholder={'# Enter a single keyword'}
          value={this.state.text}
          onChange={this.handleChange.bind(this)} />
          <View style={styles.buttonRowContainer}>
            <Button
              onPress={this.handleCancel.bind(this)}
              title="Clear"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <Button
              onPress={this.handleOk.bind(this)}
              title="Ok"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          {list}
        </View>
      </ScrollView>
  		);
  }
}

var styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop: 5,
      backgroundColor: '#F2F2F2'
    },
    tagRowContainer:{
      flexDirection: 'row',
      margin: 5,
      padding:8,
      justifyContent: 'space-between'
    },
    buttonRowContainer:{
      flexDirection: 'row',
      margin: 5,
      padding:8,
      justifyContent: 'space-between'
    },
    skillsContainer:{
      flexDirection: 'column',
      margin: 5,
      padding:8,
      justifyContent: 'space-between'
    },
    titleRowContainer:{
      flexDirection: 'row',
      margin: 5
    },
    backIcon:{
      margin: 15,
    },
    backButtonText:{
      textAlign: 'center',
      fontFamily: 'Avenir-Medium',
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white'
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
    pageTitle:{
      margin: 20,
    },
    tagsContainer:{
      backgroundColor: '#FFFFFF'
    },
    deleteTag:{
      color: 'red',
      marginRight: 5
    },
    tagContent:{
      marginLeft: 10,
    },
    TagsVerbiage:{
      margin: 8,
      padding: 5,
      backgroundColor: '#FFFFFF',
      fontFamily: 'Avenir-Medium',
      fontSize: 12,
      borderWidth: 1,
      borderColor: '#F2F2F2',
      borderRadius: 8,
    },
    searchInput: {
      height: 35,
      padding: 4,
      margin: 5,
      fontSize: 14,
      borderWidth: 1,
      borderColor: '#F2F2F2',
      borderRadius: 8,
      color: 'black'
    },
});

module.exports = AddTags;
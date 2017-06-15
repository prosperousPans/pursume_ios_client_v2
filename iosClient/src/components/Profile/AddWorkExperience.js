import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	TouchableHighlight,
  TextInput
} from 'react-native';
import Separator from '../Utilities/Separator';
import axios from 'axios';


class AddWorkExperience extends Component{
  constructor (props) {
    super(props);
    this.state = {
      job: '',
      at: ''
    }
  }

  handleJobChange(event){
    console.log(event.nativeEvent.text)
  }

  handleAtChange(event){
    console.log(event.nativeEvent.text)
  }

  render(){
  	return(
      <View style={styles.container}>
        <View style={styles.eduContainer}>
          <Text style={styles.name}>Job</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder={'Enter a role'}
            value={this.state.job}
            onChange={this.handleJobChange.bind(this)} />
        </View>
        <Separator/>
        <View style={styles.eduContainer}>
          <Text style={styles.name}>At</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder={'Enter an organization'}
            value={this.state.at}
            onChange={this.handleAtChange.bind(this)} />
        </View>
      </View>
  	);
  }
}

var styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop: 50,
      backgroundColor: '#F2F2F2',
      flexDirection: 'column',
    },
    eduContainer:{
      flexDirection: 'row',
      margin: 5,
      padding:2,
    },
    searchInput: {
      height: 35,
      width: 100,
      padding: 4,
      margin: 5,
      fontSize: 14,
      borderWidth: 1,
      borderColor: '#F2F2F2',
      borderRadius: 8,
      color: 'black'
    },
    name: {
      fontSize: 14,
      padding: 5,
      fontFamily: 'Avenir-Medium'
    },
});

module.exports = AddWorkExperience;
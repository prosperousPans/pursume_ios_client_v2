import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	TouchableHighlight,
  TextInput,
  Button
} from 'react-native';
import Separator from '../Utilities/Separator';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


class AddWorkExperience extends Component{
  constructor (props) {
    super(props);
    this.state = {
      job: '',
      at: ''
    }
  }

  handleJobChange(event){
    console.log(event.nativeEvent.text);
  }

  handleAtChange(event){
    console.log(event.nativeEvent.text);
  }

  handleBack(tag){
    this.props.navigator.pop();
  }

  handleOk(){
    console.log('work experience handle ok');
  }
  handleCancel(){
    console.log('work experience handle cancel');
  }

  render(){
    const backIcon = (<Icon name="arrow-circle-left" size={30} color="#2196F3" />);
  	return(
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableHighlight
          style={styles.backIcon}
          onPress={ ()=>{this.handleBack()}}
          >{backIcon}</TouchableHighlight>
          <Text style={styles.titleText}>Add Work Experience</Text>
        </View>
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
        <View style={styles.tagRowContainer}>
          <Button
            onPress={this.handleCancel.bind(this)}
            title="Clear"
            color="#841584"
          />
          <Button
            onPress={this.handleOk.bind(this)}
            title="Ok"
            color="#841584"
          />
        </View>
      </View>
  	);
  }
}

var styles = StyleSheet.create({
    container:{
      flex:1,
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
    tagRowContainer:{
      flexDirection: 'row',
      margin: 5,
      padding:8,
      justifyContent: 'space-between'
    },
    backIcon:{
      margin: 15,
    },
    titleContainer:{
      flexDirection: 'row',
      margin: 5,
      padding:8,
    },
    titleText:{
      marginTop: 12,
      marginLeft: 15,
      textAlign: 'center',
      fontFamily: 'Avenir-Medium',
      fontSize: 25,
      fontWeight: 'bold',
      color: '#2196F3'
      },
});

module.exports = AddWorkExperience;
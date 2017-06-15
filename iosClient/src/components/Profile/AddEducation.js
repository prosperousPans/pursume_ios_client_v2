import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Separator from '../Utilities/Separator';


class AddEducation extends Component{
  constructor (props) {
    super(props);
    this.state = {
      degree: '',
      university: ''
    }
  }

  handleDegreeChange(event){
    console.log(event.nativeEvent.text)
  }

  handleUniversityChange(event){
    console.log(event.nativeEvent.text)
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.eduContainer}>
          <Text style={styles.name}>Degrees</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder={'Enter a degree'}
            value={this.state.degree}
            onChange={this.handleDegreeChange.bind(this)} />
        </View>
        <Separator/>
        <View style={styles.eduContainer}>
          <Text style={styles.name}>School</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder={'Enter a university'}
            value={this.state.university}
            onChange={this.handleUniversityChange.bind(this)} />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container:{
      flex:1,
      paddingTop: 5,
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

module.exports = AddEducation;
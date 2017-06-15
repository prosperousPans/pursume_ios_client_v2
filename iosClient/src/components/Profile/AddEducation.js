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

  handleBack(tag){
    this.props.navigator.pop();
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableHighlight
          style={styles.backIcon}
          onPress={ ()=>{this.handleBack()}}
          >{backIcon}</TouchableHighlight>
          <Text style={styles.titleText}>Add Education</Text>
        </View>
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
    tagRowContainer:{
      flexDirection: 'row',
      margin: 5,
      padding:8,
      justifyContent: 'space-between'
    },
});

module.exports = AddEducation;
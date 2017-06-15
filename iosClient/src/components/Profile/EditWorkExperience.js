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
import AddWorkExperience from './AddWorkExperience';

class EditWorkExperience extends Component{
  constructor (props) {
    super(props);
    this.state = {
      degree: '',
      university: ''
    }
  }

  handleAdd(event){
    console.log('Handle Add WorkExperience from edit screen')
    this.props.navigator.push({
      component: AddWorkExperience,
      title: 'Add WorkExperience',
      passProps: {
            workExperienceInfo: this.props.workExperienceInfo
          }
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <View>
          <View style={styles.eduContainer}>
            <Text style={styles.name}>Job</Text>
            <Text style={styles.name}>hello Job</Text>
          </View>
          <Separator/>
          <View style={styles.eduContainer}>
            <Text style={styles.name}>At</Text>
            <Text style={styles.name}>hi At</Text>
          </View>
          <Separator/>
        </View>
        <Button
          onPress={this.handleAdd.bind(this)}
          title="Add"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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
  }
});

module.exports = EditWorkExperience;
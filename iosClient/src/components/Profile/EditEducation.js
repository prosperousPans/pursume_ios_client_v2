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
import AddEducation from './AddEducation';
import Icon from 'react-native-vector-icons/FontAwesome';

class EditEducation extends Component{
  constructor (props) {
    super(props);
    this.state = {
      degree: '',
      university: ''
    }
  }
  handleAdd(event){
    this.props.navigator.push({
      component: AddEducation,
      title: 'Add Education',
      passProps: {
            educationInfo: this.props.educationInfo
          }
    });
  }

  handleBack(tag){
    this.props.navigator.pop();
  }

  render(){
    const backIcon = (<Icon name="arrow-circle-left" size={30} color="#2196F3" />)
    const deleteIcon = (<Icon name="minus-circle" size={20} color="red" />)
    if(this.props.educationInfo && this.props.educationInfo.data ){
      var list = this.props.educationInfo.data.map(function(education, index){
        if(education.name === 'education'){
          return (
            <View>
              <View style={styles.eduContainer}>
                <View>
                  <Text>{deleteIcon}</Text>
                </View>
                <View style={styles.dataContainer} >
                  <Text style={styles.orgName}>{education.organization}</Text>
                  <Text style={styles.roleName}>{education.role}</Text>
                </View>
              </View>
              <Separator/>
          </View>
          )
        }
      })
    }
    return(
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableHighlight
          style={styles.backIcon}
          onPress={ ()=>{this.handleBack()}}
          >{backIcon}</TouchableHighlight>
          <Text style={styles.titleText}>Education</Text>
        </View>
        {list}
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
  dataContainer:{
    flexDirection: 'column',
    margin: 5,
    padding:2,
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
    marginLeft: 45,
    textAlign: 'center',
    fontFamily: 'Avenir-Medium',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2196F3'
    },
  orgName: {
    fontSize: 14,
    padding: 5,
    fontFamily: 'Avenir-Medium',
    fontWeight: 'bold'
  },
  roleName: {
    fontSize: 14,
    padding: 5,
    fontFamily: 'Avenir-Medium',
  },
});

module.exports = EditEducation;
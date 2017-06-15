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
import Icon from 'react-native-vector-icons/FontAwesome';

class EditWorkExperience extends Component{
  constructor (props) {
    super(props);
    this.state = {
      degree: '',
      university: ''
    }
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

  handleAdd(event){
    this.props.navigator.push({
      component: AddWorkExperience,
      title: 'Add WorkExperience',
      passProps: {
            workExperienceInfo: this.props.workExperienceInfo
          }
    });
  }

  render(){
    const backIcon = (<Icon name="arrow-circle-left" size={30} color="#2196F3" />);
    const deleteIcon = (<Icon name="minus-circle" size={20} color="red" />);

    if(this.props.workExperienceInfo && this.props.workExperienceInfo.data){
      var list = this.props.workExperienceInfo.data.map(function(workExperience, index){
        if(workExperience.name === 'professional'){
          return (
            <View key={index} style={styles.expContainer} >
              <View>
                <Text>{deleteIcon}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.orgContent}>{workExperience.organization}, </Text> 
                <Text style={styles.content}>{workExperience.role}</Text> 
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
          <Text style={styles.titleText}>Work Experience</Text>
        </View>
        {list}
        <Button
          onPress={this.handleAdd.bind(this)}
          title="Add"
          color="#841584"
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
  titleContainer:{
    flexDirection: 'row',
    margin: 5,
    padding:8,
  },
  expContainer:{
    flexDirection: 'row',
    margin: 5,
    padding:2,
  },
  contentContainer:{
    flexDirection: 'column',
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
});

module.exports = EditWorkExperience;
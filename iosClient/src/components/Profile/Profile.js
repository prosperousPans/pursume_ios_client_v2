import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	TouchableHighlight,
	AsyncStorage,
	ScrollView
 } from 'react-native';

import Badge from './Badge';
import Separator from '../Utilities/Separator';
import Tags from './Tags';
import AddTags from './AddTags';
import Summary from './Summary';
import AddSummary from './AddSummary';
import Industry from './Industry';
import AddIndustry from './AddIndustry';
import Education from './Education';
import AddEducation from './AddEducation';
import EditEducation from './EditEducation';
import WorkExperience from './WorkExperience';
import AddWorkExperience from './AddWorkExperience';
import EditWorkExperience from './EditWorkExperience';
import axios from 'axios';

class Profile extends Component{
  constructor (props) {
    super(props);
    this.state = {
      userDetails: '',
      tags: [],
      experience: ''
    } 
  }

  async getUserDetails(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var authid = result[0][1];
        var config = {
          headers:{ 'Authorization': 'Bearer '+ result[1][1] }
        }
        axios.get('http://localhost:3000/profile-user?authid='+ authid, config)
        .then( result => {
          this.setState({
            userDetails: result
          })
        })
      })
    }catch (error) {
        console.log('AsyncStorage error: ' + error.message);
    }
  }

  async getTagDetails(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var authid = result[0][1];
        var config = {
          headers:{'Authorization': 'Bearer '+result[1][1] }
        }
        axios.get('http://localhost:3000/profile-user/tags?authid='+ authid, config)
        .then( result => {
          this.setState({
            tags: result
          })
        })
        .catch( error => {
          console.log('error: ', error);
        })
      })
    }catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  async getExperienceDetails(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var authid = result[0][1];
        var config = {
          headers:{ 'Authorization': 'Bearer '+result[1][1] }
        }
        axios.get('http://localhost:3000/profile-user/experience?authid='+ authid, config)
        .then( result => {
          this.setState({
            experience: result
          })
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
    this.getUserDetails();
    this.getTagDetails();
    this.getExperienceDetails();
  }

  goToAddTags(){
  	this.props.navigator.push({
			component: AddTags,
			title: 'Add Tags',
      passProps: {
            tagInfo: this.state.tags
          }
		});
  }

  goToAddSummary(){
  	this.props.navigator.push({
			component: AddSummary,
			title: 'Add Summary',
      passProps: {
            summaryInfo: this.state.userDetails
          }
		});
  }

  goToAddIndustry(){
  	this.props.navigator.push({
			component: AddIndustry,
			title: 'Add Industry',
      passProps: {
            industryInfo: this.state.userDetails
          }
		});
  }

  goToAddEducation(){
    if(!this.state.experience){
    	this.props.navigator.push({
  			component: AddEducation,
  			title: 'Add Education',
        passProps: {
              educationInfo: this.state.experience
            }
  		});
    } else {
      this.props.navigator.push({
        component: EditEducation,
        title: 'Edit Education',
        passProps: {
              educationInfo: this.state.experience
            }
      });
    }
  }

  goToAddWorkExperience(){
    if(!this.state.experience){
      this.props.navigator.push({
        component: AddWorkExperience,
        title: 'Add WorkExperience',
        passProps: {
              workExperienceInfo: this.state.experience
            }
      });
    } else {
      this.props.navigator.push({
        component: EditWorkExperience,
        title: 'Edit WorkExperience',
        passProps: {
              workExperienceInfo: this.state.experience
            }
      });
    }
  }

  render(){
  	return(
  		<ScrollView style={styles.listcontainer}>
				<Badge imageInfo={this.state.userDetails} experience = {this.state.experience}/>
        <View>
					<TouchableHighlight style={styles.rowContainer} underlayColor="transparent"  onPress={ () => this.goToAddTags() }>
						<View
							style={styles.detailContainer}>
							<Tags tagInfo={this.state.tags}/>
						</View>
					</TouchableHighlight>
					<Separator/>	
					<TouchableHighlight style={styles.rowContainer} underlayColor="transparent" onPress={ () => this.goToAddSummary() }>
						<View
							style={styles.detailContainer}>
							<Summary summaryInfo={this.state.userDetails}/>
						</View>
					</TouchableHighlight>
					<Separator/>
					<TouchableHighlight style={styles.rowContainer} underlayColor="transparent"  onPress={ () => this.goToAddIndustry() }>
						<View
							style={styles.detailContainer}>
							<Industry industryInfo={this.state.userDetails}/>
						</View>
					</TouchableHighlight>
					<Separator/>
					<TouchableHighlight style={styles.rowContainer} underlayColor="transparent"  onPress={ () => this.goToAddEducation() }>
						<View
							style={styles.detailContainer}>
							<Education educationInfo={this.state.experience}/>
						</View>
					</TouchableHighlight>
					<Separator/>	
          <TouchableHighlight style={styles.rowContainer} underlayColor="transparent"  onPress={ () => this.goToAddWorkExperience() }>
            <View
              style={styles.detailContainer}>
              <WorkExperience workExperienceInfo={this.state.experience}/>
            </View>
          </TouchableHighlight>
          <Separator/>  			
				</View>
      </ScrollView>
  		);
  }
}

var styles = StyleSheet.create({
    containerProfile:{
      flexDirection: 'row',
      marginLeft: 10,
      padding:5
    },
    detailContainer: {
    	flexDirection:'row', 
    	flexWrap:'wrap'
    },
    container: {
    	paddingTop: 20,
      height:55,
    },
    image:{
      height: 40,
      borderRadius: 20,
      width: 40,
    },
    rowContainer: {
      padding: 10
    },
    rowTitle: {
      color: '#48BBEC',
      fontSize: 16
    },
    addDetailsSymbol: {
      color: '#48BBEC',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'right'
    },
    rowContent: {
      fontSize: 19
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
  
});

module.exports = Profile;
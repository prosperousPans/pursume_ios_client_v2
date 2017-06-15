import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Separator from '../Utilities/Separator';
import Icon from 'react-native-vector-icons/FontAwesome';



class WorkExperience extends Component{
  constructor (props) {
    super(props);
  }

  render(){
    const organizationIcon = (<Icon name="sitemap" size={15} color="#2196F3" />)

    if(this.props.workExperienceInfo && this.props.workExperienceInfo.data){
      var list = this.props.workExperienceInfo.data.map(function(workExperience, index){
        if(workExperience.name === 'professional'){
          return (
            <View key={index} style={styles.contentContainer} >
              <Text style={styles.orgContent}>{workExperience.organization}, </Text> 
              <Text style={styles.content}>{workExperience.role}</Text> 
            </View>
          )
        }
      })
    } 
    return(
      (this.props.workExperienceInfo && this.props.workExperienceInfo.data ) 
      ? 
      <View style={styles.detailContainer}>
        <Text>{organizationIcon}</Text>
        <Text style={styles.rowTitle}>Previous Organizations</Text>
        {list}
      </View>
      :
      <View style={styles.detailContainer}>
        <Text style={styles.rowTitle}>WorkExperience\</Text><Text style={styles.content}>Add your Work Experience</Text><Text style={styles.addDetailsSymbol}>+</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container:{
      fontFamily: 'Avenir-Medium'
    },
    rowTitle: {
      marginLeft: 15,
      fontSize: 14,
      fontFamily: 'Avenir-Medium',
      fontWeight: 'bold',
      color: '#2196F3',
    },

    // rowTitle: {
    //   color: 'orange',
    //   fontSize: 16,
    //   fontFamily: 'Avenir-Medium'
    // },

    // detailContainer: {
    //   flexDirection:'row', 
    //   flexWrap:'wrap',
    //   justifyContent: 'space-between'
    // },

    detailContainer: {
      flexDirection:'row', 
      flexWrap:'wrap',
      marginLeft: 15
    },
    addDetailsSymbol: {
      color: '#2196F3',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'right',
      fontFamily: 'Avenir-Medium'
    },
    content: {
      fontSize: 13,
      fontFamily: 'Avenir-Medium',
      color: '#525050',
    },
    contentContainer: {
      flexDirection:'row', 
      flexWrap:'wrap',
      marginLeft: 30  
    },
    orgContent:{
      fontSize: 13,
      fontFamily: 'Avenir-Medium',
      fontWeight: 'bold'
    }
});

module.exports = WorkExperience;
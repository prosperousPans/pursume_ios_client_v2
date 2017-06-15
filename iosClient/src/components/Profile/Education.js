import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Separator from '../Utilities/Separator';
import Icon from 'react-native-vector-icons/FontAwesome';

class Education extends Component{
  constructor (props) {
    super(props);
  }

  render(){
    const educationIcon = (<Icon name="graduation-cap" size={15} color="#2196F3" />)

    if(this.props.educationInfo && this.props.educationInfo.data ){
      var list = this.props.educationInfo.data.map(function(education, index){
        if(education.name === 'education'){
          return (
            <View key={index} style={styles.contentContainer} >
              <Text style={styles.orgContent}>{education.organization}, </Text> 
              <Text style={styles.content}>{education.role}</Text> 
            </View>
          )
        }
      })
    } 
    return(
      (this.props.educationInfo && this.props.educationInfo.data ) 
      ? 
      <View>
        <View style={styles.detailContainer}>
          <Text>{educationIcon}</Text>
          <Text style={styles.rowTitle}>Education</Text>
        </View>
        {list}
      </View>
      :
      <View style={styles.detailContainer}>
          <Text style={styles.rowTitle}>Education</Text><Text style={styles.content}>Add your education</Text><Text style={styles.addDetailsSymbol}>+</Text>
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
  detailContainer: {
    flexDirection:'row', 
    flexWrap:'wrap',
    marginLeft: 15
  },
  contentContainer: {
    flexDirection:'row', 
    flexWrap:'wrap',
    marginLeft: 50  
  },
  addDetailsSymbol: {
    color:'#2196F3',
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
  orgContent:{
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    fontWeight: 'bold'
  }
});

module.exports = Education;
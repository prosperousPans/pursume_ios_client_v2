import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Separator from '../Utilities/Separator';
import Icon from 'react-native-vector-icons/FontAwesome';


class Industry extends Component{
  constructor (props) {
    super(props);
  }

  render(){
    const industryIcon = (<Icon name="industry" size={15} color="#2196F3" />)
    return(
      (this.props.industryInfo !== '') ? 
      <View style={styles.detailContainer} >
        <View style={styles.titleContainer}>
          <Text >{industryIcon}</Text>
          <Text style={styles.rowTitle}>My Industry</Text>
        </View>
          <Text style={styles.content}>{this.props.industryInfo.data.vertical}</Text>
      </View> 
      :  
      <View style={styles.detailContainer}>
        <Text style={styles.rowTitle}>My Industry</Text><Text style={styles.content}>Select an Industry</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    fontFamily: 'Avenir-Medium'
  },
  titleContainer: {
    flexDirection:'row', 
  },
  rowTitle: {
    marginLeft: 20,
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    fontWeight: 'bold',
    color: '#2196F3',
  },
  detailContainer: {
    flexDirection:'column', 
    flexWrap:'wrap',
    justifyContent: 'space-between',
    paddingRight:30,
    paddingLeft:15
  },
  addDetailsSymbol: {
    color: '#525050',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: 'Avenir-Medium'
  },
  content: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    marginLeft: 35,
    color: '#525050',
  }
});

module.exports = Industry;
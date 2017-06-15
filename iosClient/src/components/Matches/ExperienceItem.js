import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Separator from '../Utilities/Separator';


class ExperienceItem extends Component {
  constructor (props){
    super();
  }

  render() {
    return (
      <View style={styles.card}>      
        <View style={styles.rowContainer} >
          <View style={styles.detailContainer} >
            <View style={styles.titleContainer}>
              <Text style={styles.rowTitle}>{this.props.exp.organization}</Text>
            </View>
              <Text style={styles.content}>{this.props.exp.role}</Text>
              <Text style={styles.content}>{this.props.exp.start_date} - {this.props.exp.end_date}</Text>
              <Text style={styles.content}>{this.props.exp.description}</Text>
          </View> 
        </View>

        <Separator/>      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    padding: 10
  },  
  titleContainer: {
    flexDirection:'row', 
  },
  rowTitle: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
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
  content: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    marginLeft: 25,
    color: '#525050',
  },

})

module.exports = ExperienceItem;
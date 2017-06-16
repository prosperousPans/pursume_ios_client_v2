import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import Separator from '../Utilities/Separator';
import ExperienceItem from './ExperienceItem.js'

export class PersonalCard extends Component {
  constructor (props){
    super();
  }

  render() {
    let currentProfile = this.props.currentMatch.profile[0];
    const personalIcon = (<Icon name="user-o" size={35} color="grey" />)
    const quoteIconLeft = (<Icon name="quote-left" size={15} color="#2196F3" />)
    const quoteIconRight = (<Icon name="quote-right" size={15} color="#2196F3" />)    
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitleText}>{personalIcon} About Me</Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.quoteContainerLeft} ><Text style={styles.textContainer} >{quoteIconLeft}</Text></View> 
            <View style={styles.contentContainer}>
                <Text style={styles.personalContent}>{currentProfile.summary}</Text>
            </View> 
          <View style={styles.quoteContainerRight}><Text style={styles.textContainer} >{quoteIconRight}</Text></View> 
        </View>        
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    currentMatch: state.Matches.currentMatch
  }
};

export default connect(mapStateToProps)(PersonalCard);

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5    
  },
  cardTitleText: {
    alignSelf: 'center',  
    color: 'grey',
    fontFamily: 'Avenir-Medium',    
    fontSize: 35,
    fontWeight: 'bold',
  },


  //quote block
  mainContainer:{
    flexDirection:'row', 
    justifyContent: 'space-between',
    flexWrap : 'wrap',
    padding: 10 
  },
  quoteContainerLeft:{
    marginLeft:15,
    width:30
  },
  quoteContainerRight:{
    marginLeft:15,
    width:30,
    marginTop:50
  },
  contentContainer:{
    marginLeft:3,
    marginRight:3,
    width:250,
    flexWrap:'wrap',
  },  
  personalContent: {
    color: 'grey',
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    fontStyle: 'italic',
    marginLeft:10,
  }, 
})

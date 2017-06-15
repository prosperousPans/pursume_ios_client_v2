import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import ExperienceItem from './ExperienceItem.js'

export class EducationCard extends Component {
  render() {
    let currentMatchEduExp = this.props.currentMatch.eduExp;
    const educationIcon = (<Icon name="graduation-cap" size={35} color="grey" />)
    return (
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitleText}>{educationIcon} Education</Text>
        </View>

        {currentMatchEduExp.map( (exp)=> <ExperienceItem key={exp.id} exp={exp}/> )}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    currentMatch: state.Matches.currentMatch
  }
};

export default connect(mapStateToProps)(EducationCard);

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

})
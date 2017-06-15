import React, {Component} from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Switch,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux';

export class MatchedModal extends Component{
  constructor (props){
    super();
  }

  render() {
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.bigText}>{this.props.currentMatch.profile[0].full_name} wants to meet you too!</Text>
          <Text style={styles.medText}>Go chat with them now!</Text>
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

export default connect(mapStateToProps)(MatchedModal);

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: height*0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bigText: {
    alignSelf: 'center',  
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
  medText: {
    alignSelf: 'center',  
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
  },
  pursumeButton: {
    alignItems: 'center',     
    padding: 10,
    backgroundColor:'#2196F3',
  },  
  submitButton: {  
    marginTop: 20,
    alignItems: 'center',     
    padding: 10,
    color: '#fff',    
    fontSize: 15,
    fontWeight: 'bold',    
    backgroundColor:'#2196F3',
  },
  switch: {
    alignSelf: 'center',  
  }
})



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
import { sendResponse } from '../../actions/Pursume';
import { getMatches } from '../../actions/Matches';

import ExperienceItem from './ExperienceItem.js'
import MatchedModal from './MatchedModal.js';

class PursumeModalForm extends Component{
  constructor (props){
    super();
    this.state = {
      meetSwitchIsOn: false,
      meetSwitchIsDisable: false,
      passSwitchIsOn: false,
      passSwitchIsDisable: false,
      educationSwitchIsOn: false,
      professionalSwitchIsOn: false,
      projectSwitchIsOn: false,
      personalSwitchIsOn: false,
    };
    this.formSubmit =  this.formSubmit.bind(this);
  }

  formSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state);   
  }

  render() {
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.bigText}>Do you want to meet?</Text>
          <Text style={styles.medText}>Yes</Text>
          <Switch
            disabled={this.state.meetSwitchIsDisable}
            style={styles.switch}        
            onValueChange={(value) => {
              if (value) {
                this.setState({passSwitchIsDisable: true, meetSwitchIsOn: value})                
              } else {
                this.setState({passSwitchIsDisable: false, meetSwitchIsOn: value})                
              }
            }}
            value={this.state.meetSwitchIsOn} />
          
          <Text style={styles.medText}>No</Text>
          <Switch
            disabled={this.state.passSwitchIsDisable}          
            style={styles.switch}        
            onValueChange={(value) => {
              if (value) {
                this.setState({meetSwitchIsDisable: true, passSwitchIsOn: value})                
              } else {
                this.setState({meetSwitchIsDisable: false, passSwitchIsOn: value})                
              }
            }}
            value={this.state.passSwitchIsOn} />
        </View>
        <View>
          <Text style={styles.bigText}>Reason?</Text>

          <Text style={styles.medText}>Education</Text>
          <Switch
            onValueChange={(value) => this.setState({educationSwitchIsOn: value})}
            style={styles.switch}                    
            value={this.state.educationSwitchIsOn} />                      
                    
          <Text style={styles.medText}>Professional</Text>
          <Switch
            onValueChange={(value) => this.setState({professionalSwitchIsOn: value})}
            style={styles.switch}                    
            value={this.state.professionalSwitchIsOn} />                      
    
          <Text style={styles.medText}>Project</Text>
          <Switch
            onValueChange={(value) => this.setState({projectSwitchIsOn: value})}
            style={styles.switch}        
            value={this.state.projectSwitchIsOn} />
          
          <Text style={styles.medText}>Personal</Text>
          <Switch
            onValueChange={(value) => this.setState({personalSwitchIsOn: value})}
            style={styles.switch}        
            value={this.state.personalSwitchIsOn} />            
        </View>
        <TouchableOpacity
          onPress={this.formSubmit}
        >
          <Text style={styles.submitButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default PursumeModalForm;
// const mapStateToProps = (state) => {
//   return {
//     ...state
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     sendResponse: (response) => { dispatch( sendResponse(response) ) }
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PursumeModalForm);

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



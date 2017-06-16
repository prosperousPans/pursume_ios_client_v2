import React, {Component} from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Platform,
  Switch,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Separator from '../Utilities/Separator';

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
    let meetIcon = (<Icon name="check" size={35} color="grey" />)    
    let meetText = <View style={styles.iconContainer}>{meetIcon}<Text style={styles.medText}>Meet!</Text></View>

    let passIcon = (<Icon name="remove" size={35} color="grey" />)    
    let passText = <View style={styles.iconContainer}>{passIcon}<Text style={styles.medText}>Pass!</Text></View>
    
    let aboutMeIcon = (<Icon name="user-o" size={35} color="grey" />)    
    let aboutMeText = <View style={styles.iconContainer}>{aboutMeIcon}<Text style={styles.medText}>About Me</Text></View>
    let educationIcon = (<Icon name="graduation-cap" size={35} color="grey" />)
    let educationText = <View style={styles.iconContainer}>{educationIcon}<Text style={styles.medText}>Education</Text></View>
    let professionalIcon = (<Icon name="building-o" size={35} color="grey" />)
    let professionalText = <View style={styles.iconContainer}>{professionalIcon}<Text style={styles.medText}>Professional</Text></View>
    let projectIcon = (<Icon name="laptop" size={35} color="grey" />)
    let projectText = <View style={styles.iconContainer}>{projectIcon}<Text style={styles.medText}>Project</Text></View>

    if (this.state.meetSwitchIsOn) {
      meetIcon = (<Icon name="check" size={35} color="#2196F3" />)    
      meetText = <View style={styles.iconContainer}>{meetIcon}<Text style={styles.medTextHighlight}>Meet!</Text></View>
    }
    if (this.state.passSwitchIsOn) {
      passIcon = (<Icon name="remove" size={35} color="#2196F3" />)    
      passText = <View style={styles.iconContainer}>{passIcon}<Text style={styles.medTextHighlight}>Pass!</Text></View>
    }    

    if (this.state.personalSwitchIsOn) {
      aboutMeIcon = (<Icon name="user-o" size={35} color="#2196F3" />)    
      aboutMeText = <View style={styles.iconContainer}>{aboutMeIcon}<Text style={styles.medTextHighlight}>About Me</Text></View>
    }
    if (this.state.educationSwitchIsOn) {
      educationIcon = (<Icon name="graduation-cap" size={35} color="#2196F3" />)
      educationText = <View style={styles.iconContainer}>{educationIcon}<Text style={styles.medTextHighlight}>Education</Text></View>
    }
    if (this.state.professionalSwitchIsOn) {
      professionalIcon = (<Icon name="building-o" size={35} color="#2196F3" />)
      professionalText = <View style={styles.iconContainer}>{professionalIcon}<Text style={styles.medTextHighlight}>Professional</Text></View>
    }
    if (this.state.projectSwitchIsOn) {
      projectIcon = (<Icon name="laptop" size={35} color="#2196F3" />)
      projectText = <View style={styles.iconContainer}>{projectIcon}<Text style={styles.medTextHighlight}>Project</Text></View>
    }            
    return (
      <View style={styles.card}>
          <Text style={styles.bigText}>Want to meet?</Text>

        <View style= {styles.iconRowContainer}>
          <TouchableOpacity 
            onPress={()=>{
              var value = this.state.meetSwitchIsOn
              this.setState({meetSwitchIsOn: !value})
            }}
          >
            {meetText}
          </TouchableOpacity>          

          <TouchableOpacity 
            onPress={()=>{
              var value = this.state.passSwitchIsOn
              this.setState({passSwitchIsOn: !value})
            }}
          >
            {passText}
          </TouchableOpacity>                    
        </View>


        <View>
          <View style={styles.reasonSection}>
            <View style={styles.separator} />
          </View>

          <Text style={styles.bigText}>Reason?</Text>
          <Text style={styles.medText}>(Choose 1 main reason)</Text>

          <View style={styles.iconRowContainer}>
            <View>
              <TouchableOpacity 
                onPress={()=>{
                  var value = this.state.educationSwitchIsOn
                  this.setState({educationSwitchIsOn: !value})
                }}
              >
                {educationText}
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={()=>{
                  var value = this.state.professionalSwitchIsOn
                  this.setState({professionalSwitchIsOn: !value})
                }}
              >
                {professionalText}
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity 
                onPress={()=>{
                  var value = this.state.projectSwitchIsOn
                  this.setState({projectSwitchIsOn: !value})
                }}
              >
                {projectText}
              </TouchableOpacity>          
              
              <TouchableOpacity 
                onPress={()=>{
                  var value = this.state.personalSwitchIsOn
                  this.setState({personalSwitchIsOn: !value})
                }}
              >
                {aboutMeText}
              </TouchableOpacity>  
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={this.formSubmit}
          style={styles.submitButton} 
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        <TouchableHighlight 
          style={styles.button} 
          onPress={this.formSubmit}
          underlayColor="white">
            <Text style={styles.submitButtonText}> Login </Text>
        </TouchableHighlight>        
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
    borderRadius: 5,       
  },
  reasonSection: {
    padding: 10
  },
  iconRowContainer: {
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },  
  iconContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  medText: {
    alignSelf: 'center',  
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Avenir-Medium',        
    fontWeight: 'bold',
  },
  medTextHighlight: {
    alignSelf: 'center',  
    color: '#2196F3',
    fontSize: 15,
    fontFamily: 'Avenir-Medium',        
    fontWeight: 'bold',
  },

  
  bigText: {
    alignSelf: 'center',  
    color: '#2196F3',
    fontSize: 30,
    fontFamily: 'Avenir-Medium',        
    fontWeight: 'bold',
  },


  submitButtonText: {
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Avenir-Medium',        
    // fontWeight: 'bold',    
  },

  submitButton: { 
    borderRadius: 5,   
    marginTop: 20,
    padding: 20,
    alignItems: 'center',     
    padding: 10,
    backgroundColor:'#2196F3',
  },  

  separator: {
    height: 1,
    backgroundColor: 'grey',
  },  
})



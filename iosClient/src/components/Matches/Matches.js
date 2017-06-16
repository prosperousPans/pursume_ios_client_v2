import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  AsyncStorage
} from 'react-native';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal'

import { connect } from 'react-redux';
import { getMatches } from '../../actions/Matches';
import { nextMatch } from '../../actions/Matches';
import { sendResponse } from '../../actions/Pursume';

import HighlightsCard from './HighlightsCard.js';
import ProfessionalCard from './ProfessionalCard.js';
import EducationCard from './EducationCard.js';
import ProjectCard from './ProjectCard.js';
import PersonalCard from './PersonalCard.js';
import PursumeModalForm from './PursumeModalForm.js';
import MatchedModal from './MatchedModal.js';

export class Matches extends Component{
  constructor (props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isMatchedModalVisible: false,
      currentIndex: 0
    }

    this.determineUser = this.determineUser.bind(this);    
    this.checkMatch = this.checkMatch.bind(this);
    this._showModal = this._showModal.bind(this);
    this._hideModal = this._hideModal.bind(this);
    this._showMatchModal = this._showMatchModal.bind(this);
    this._hideMatchModal = this._hideMatchModal.bind(this);    
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this._onMomentumScrollEnd = this._onMomentumScrollEnd.bind(this);
    this.determineUser();    
  }

  async determineUser(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var authid = result[0][1];
        var config = {
          headers:{ 'Authorization': 'Bearer '+ result[1][1] }
        }
        this.props.fetch(authid, config);
      })
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  
  _showModal() {
   this.setState({ isModalVisible: true }) 
  }
 
  _hideModal() {
    this.setState({ isModalVisible: false })
  }

  _showMatchModal() {
   this.setState({ isMatchedModalVisible: true }) 
  }
 
  _hideMatchModal() {
    this.setState({ isMatchedModalVisible: false })
    this.refs.slider.scrollBy(this.state.currentIndex * -1)
    AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
      var authid = result[0][1];
      var config = {
        headers:{ 'Authorization': 'Bearer '+ result[1][1] }
      }
      this.props.nextMatch(authid, config);
    })
  }

  checkMatch() {
    if (this.props.matched === 'MATCH') {
      this._hideModal();
      setTimeout(this._showMatchModal, 1000);
    } else {
      this._hideModal();
      this.refs.slider.scrollBy(this.state.currentIndex * -1)

      AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var authid = result[0][1];
        var config = {
          headers:{ 'Authorization': 'Bearer '+ result[1][1] }
        }
        this.props.nextMatch(authid, config);
      })
    }
  }

  handleModalSubmit (response) {
    AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
      var authid = result[0][1];
      var config = {
        headers:{ 'Authorization': 'Bearer '+ result[1][1] }
      }
      let users_a_auth_id = authid;
      let users_b_id = this.props.currentMatch.profile[0].id;

      this.props.pursume(response, users_a_auth_id, users_b_id, config)
    })

    setTimeout(this.checkMatch, 1000);
  }

  _onMomentumScrollEnd(e, state, context) {
    this.state.currentIndex = state.index;    
  }  

  render() {
    if (this.props.currentMatch) {
      return(
        <View>

          <View>
            <TouchableOpacity
              onPress={this._showModal}
              style={styles.pursumeButton}
            >
              <Text style={styles.pursumeButtonText}>Pursumé</Text>
            </TouchableOpacity>

            <Modal isVisible={this.state.isModalVisible}>
              <TouchableOpacity
                onPress={this._hideModal}
              >
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <PursumeModalForm handleSubmit={this.handleModalSubmit}/>             
              </View>
            </Modal>
          </View>

          <View>
            <Modal isVisible={this.state.isMatchedModalVisible}>
              <TouchableOpacity
                onPress={this._hideMatchModal}
              >
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <MatchedModal handleSubmit={this.handleModalSubmit}/>
              </View>
            </Modal>
          </View>

          <Swiper 
            height = {height*0.83}
            loop = {false}
            showsButtons={true}
            ref="slider"
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            nextButton={<Text style={{color: '#2196F3', fontSize: 40}}>›</Text>}
            prevButton={<Text style={{color: '#2196F3', fontSize: 40}}>‹</Text>}
            activeDotColor={'#2196F3'}
          >
            <HighlightsCard />
            <PersonalCard />
            <EducationCard />
            <ProfessionalCard />
            <ProjectCard />
          </Swiper>

        </View>
      ) 
    } else {
      console.log('no more matches');
      return (
        <View>
          <TouchableOpacity
            style={styles.pursumeButton}
          >
            <Text style={styles.pursumeButtonText}>No more matches</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
};

const mapStateToProps = (state) => {
  return {
    ...state,
    allMatches: state.Matches.allMatches,
    currentMatch: state.Matches.currentMatch,
    matched: state.Pursume.matchStatus
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: (authid, config) => { dispatch( getMatches(authid, config) ) },
    pursume: (response, users_a_auth_id, users_b_id, config) => { dispatch( sendResponse(response, users_a_auth_id, users_b_id, config) ) },
    nextMatch: (authid, config) => { dispatch( nextMatch(authid, config) ) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);

const {width, height} = Dimensions.get('window')

const styles = StyleSheet.create({ 
  pursumeButton: {
    alignItems: 'center',     
    padding: 10,
    backgroundColor:'#2196F3',
    // borderRadius: 5,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pursumeButtonText: {
    fontSize: 30,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'Avenir-Medium',    
  },
  closeButton: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',    
  },
  bigText: {
    flex: 1,    
    justifyContent: 'center',
    alignItems: 'center',    
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },  
});
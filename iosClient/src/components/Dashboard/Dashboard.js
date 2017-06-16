import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../../actions/Dashboard';

import MatchPercGraph from './MatchPercGraph';
import TopIndustryGraph from './TopIndustryGraph';
import TopReasonGraph from './TopReasonGraph';

import Separator from '../Utilities/Separator';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

export class Dashboard extends Component {
  constructor (props){
    super();
    this.state = {
      graph: 'MatchPercGraph'
    }
    this.determineUser();
    this.handleMatchPercGraphClick = this.handleMatchPercGraphClick.bind(this);
    this.handleTopIndustryGraphClick = this.handleTopIndustryGraphClick.bind(this);
    this.handleTopReasonGraphClick = this.handleTopReasonGraphClick.bind(this);
  }

  async determineUser(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var authid = result[0][1];
        var config = {
          headers:{ 'Authorization': 'Bearer '+ result[1][1] }
        }
        this.props.fetchData(authid, config);
      })
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  handleMatchPercGraphClick() {
    this.setState({graph: 'MatchPercGraph'});
  }

  handleTopIndustryGraphClick() {
    this.setState({graph: 'TopIndustryGraph'});
  }

  handleTopReasonGraphClick() {
    this.setState({graph: 'TopReasonGraph'});
  }

  render() {
    let reasonIcon = this.props.topReason;
    if (this.props.topReason === 'education') {
      reasonIcon = <Icon name="graduation-cap" size={48} color="#2196F3" />;
    } else if (this.props.topReason === 'professional') {
      reasonIcon = <Icon name="building-o" size={48} color="#2196F3" />;
    } else if (this.props.topReason === 'project') {
      reasonIcon = <Icon name="laptop" size={48} color="#2196F3" />;
    } else if (this.props.topReason === 'personal') {
      reasonIcon = <Icon name="user-o" size={48} color="#2196F3" />;
    }

    let renderGraph = this.state.graph;
    if (this.state.graph === 'MatchPercGraph') {
      renderGraph = <MatchPercGraph style={styles.graphContainer}/>;
    } else if (this.state.graph === 'TopIndustryGraph') {
      renderGraph = <TopIndustryGraph style={styles.graphContainer}/>;
    } else if (this.state.graph === 'TopReasonGraph') {
      renderGraph = <TopReasonGraph style={styles.graphContainer}/>;
    } 

    if (this.props.topVertical){
      return (
        <ScrollView>
          <TouchableOpacity onPress={this.handleMatchPercGraphClick} style={styles.rowContainer}>
            <Text style={styles.bigText}>{Math.floor(this.props.percentMatches*100)}%</Text>
            <Text style={styles.medText}>Of people wants to meet you!</Text>
          </TouchableOpacity>
          <Separator />

            <TouchableOpacity onPress={this.handleTopReasonGraphClick} style={styles.rowContainer}>          
              <View>
                <Text style={styles.bigText}>{reasonIcon} {"'" + this.props.topReason + "'"} </Text>
                <Text style={styles.medText}>Top Reason for Connect</Text>
              </View>
            </TouchableOpacity>          
          <Separator />
          <TouchableOpacity onPress={this.handleTopIndustryGraphClick} style={styles.rowContainer}>                         
            <Text style={styles.bigText}>{"'" + this.props.topVertical + "'"}</Text>
            <Text style={styles.medText}> Top Industry of Connections</Text>
          </TouchableOpacity>

          <Separator />
          {renderGraph}
        </ScrollView>
      )
    } else {
      return (<View>{console.log('LOADING DASH')}</View>)
    }
  }
}

const mapStateToProps = (state) => {
  console.log('STATE IN mapStateToProps - Dashboard', state)
  return {
    ...state,
    allConnect: state.Dashboard.allConnect, //all users that viewed you
    allAccept: state.Dashboard.allAccept, //all users that accepted you
    percentMatches: state.Dashboard.percentMatches,
    topReason: state.Dashboard.topReason,
    topVertical: state.Dashboard.topVertical
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (authid, config) => { dispatch( getData(authid, config) ) },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  rowContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',    
  },

  bigText: {
    alignSelf: 'center',  
    fontSize: 35,
    fontFamily: 'Avenir-Medium',    
    fontWeight: 'bold',
    color: '#2196F3',        
  },
  medText: {
    alignSelf: 'center',      
    color: 'grey',
    fontFamily: 'Avenir-Medium',    
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',    
  },

})


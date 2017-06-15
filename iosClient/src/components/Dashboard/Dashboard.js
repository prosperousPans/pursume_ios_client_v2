import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { getData } from '../../actions/Dashboard';

import MatchPercGraph from './MatchPercGraph';
import TopIndustryGraph from './TopIndustryGraph';
import TopReasonGraph from './TopReasonGraph';
import NumConnectGraph from './NumConnectGraph';

import Separator from '../Utilities/Separator';
import Icon from 'react-native-vector-icons/FontAwesome';

import { VictoryBar, VictoryPie } from "victory-native";
import axios from 'axios';

export class Dashboard extends Component {
  constructor (props){
    super();
    this.state = {
      graph: 'MatchPercGraph'
    }
    // this.determineUser();
    this.handleMatchPercGraphClick = this.handleMatchPercGraphClick.bind(this);
    this.handleTopIndustryGraphClick = this.handleTopIndustryGraphClick.bind(this);
    this.handleTopReasonGraphClick = this.handleTopReasonGraphClick.bind(this);
    this.handleNumConnectGraphClick = this.handleNumConnectGraphClick.bind(this);
  }

  // async determineUser(){
  //   try {  
  //     await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
  //       var authid = result[0][1];
  //       var config = {
  //         headers:{ 'Authorization': 'Bearer '+ result[1][1] }
  //       }
  //       this.props.fetchData(authid, config);
  //     })
  //   } catch (error) {
  //     console.log('AsyncStorage error: ' + error.message);
  //   }
  // }

  handleMatchPercGraphClick() {
    console.log('handleMatchPercGraphClick')
    this.setState({graph: 'MatchPercGraph'});
  }

  handleTopIndustryGraphClick() {
    console.log('handleTopIndustryGraphClick')    
    this.setState({graph: 'TopIndustryGraph'});
  }

  handleTopReasonGraphClick() {
    console.log('handleTopReasonGraphClick')    
    this.setState({graph: 'TopReasonGraph'});
  }

  handleNumConnectGraphClick() {
    console.log('handleNumConnectGraphClick')    
    this.setState({graph: 'NumConnectGraph'});
  }

  render() {
    // {console.log(this.props,'this.props INSIDE DASHBOARD RENDER')}
    const educationIcon = (<Icon name="graduation-cap" size={48} color="#2196F3" />)
    const professionalIcon = (<Icon name="building-o" size={48} color="#2196F3" />)
    const projectIcon = (<Icon name="laptop" size={48} color="#2196F3" />)    

    let renderGraph = this.state.graph;
    if (this.state.graph === 'MatchPercGraph') {
      renderGraph = <MatchPercGraph />;
    } else if (this.state.graph === 'TopIndustryGraph') {
      renderGraph = <TopIndustryGraph />;
    } else if (this.state.graph === 'TopReasonGraph') {
      renderGraph = <TopReasonGraph />;
    } else if (this.state.graph === 'NumConnectGraph') {
      renderGraph = <NumConnectGraph />;
    }
    // if (this.props.topVertical){
      return (
        <View>
          <TouchableOpacity onPress={this.handleMatchPercGraphClick} style={styles.rowContainer}>
            <Text style={styles.topTextPerc}>86%</Text>
            <Text style={styles.medText}>people wants to meet you after seeing your profile!</Text>
          </TouchableOpacity>
          <Separator />
          
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.handleNumConnectGraphClick} style={styles.rowContainer}>                         
              <Text style={styles.bigText}>7</Text>
              <Text style={styles.medText}>Number of connection</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleTopIndustryGraphClick} style={styles.rowContainer}>          
              <Text style={styles.bigText}>{educationIcon}</Text>
              <Text style={styles.medText}>Top Reason for Connection</Text>
            </TouchableOpacity>
          </View>
          <Separator />
          <TouchableOpacity onPress={this.handleTopReasonGraphClick} style={styles.rowContainer}>                         
            <Text style={styles.bigText}>'Social'</Text>
            <Text style={styles.medText}>Top Industry of Connections</Text>
          </TouchableOpacity>

          <Separator />
          {renderGraph}
        </View>
      )
    // } else {
    //   return (<View>{console.log('LOADING DASH')}</View>)
    // }
  }
}

const mapStateToProps = (state) => {
  console.log('STATE IN mapStateToProps - Dashboard', state)
  return {
    ...state,
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
  //padding 
  rowContainer: {
    padding: 12
  },  
  topTextPerc: {
    alignSelf: 'center',  
    fontSize: 50,
    fontFamily: 'Avenir-Medium',    
    fontWeight: 'bold',
    color: '#2196F3',        
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
  smallText: {
    alignSelf: 'center',      
    color: 'grey',
    fontFamily: 'Avenir-Medium',    
    fontSize: 8,
    fontWeight: 'bold',
  },
})


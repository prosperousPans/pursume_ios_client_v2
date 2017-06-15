import { random, range, round } from "lodash";

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
import Separator from '../Utilities/Separator';
import Icon from 'react-native-vector-icons/FontAwesome';

import { VictoryBar, VictoryPie } from "victory-native";
import axios from 'axios';

export class TopIndustryGraph extends Component {
  constructor (props){
    super();
    this.state = {
      randomData: this.generateRandomData(),
    }
  }

  componentDidMount() {
    setInterval(this.updateDemoData.bind(this), 3000);
  }  

  generateRandomData(points = 6) {
    return range(1, points + 1).map((i) => ({ x: i, y: i + random(-1, 2) }));
  }

  updateDemoData() {
    this.setState({
      randomData: this.generateRandomData()
    });
  }  

  render() {
    // {console.log(this.props,'this.props INSIDE DASHBOARD RENDER')}
    const educationIcon = (<Icon name="graduation-cap" size={48} color="#2196F3" />)
    const professionalIcon = (<Icon name="building-o" size={48} color="#2196F3" />)
    const projectIcon = (<Icon name="laptop" size={48} color="#2196F3" />)    
    // if (this.props.topVertical){
    return (
      <View>
        <VictoryPie
          innerRadius={75}
          labelRadius={125}
          style={{ labels: { fontSize: 20 } }}
          data={this.state.randomData}
          animate={{ duration: 1500 }}
        />
      </View>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(TopIndustryGraph);

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


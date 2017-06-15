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

import { VictoryPie, VictoryChart } from "victory-native";
import axios from 'axios';

export class NumConnectGraph extends Component {
  constructor (props){
    super();
  }

  render() {
    // {console.log(this.props,'this.props INSIDE DASHBOARD RENDER')}
    const educationIcon = (<Icon name="graduation-cap" size={48} color="#2196F3" />)
    const professionalIcon = (<Icon name="building-o" size={48} color="#2196F3" />)
    const projectIcon = (<Icon name="laptop" size={48} color="#2196F3" />)    
    const data = [
      {quarter: 1, earnings: 13000},
      {quarter: 2, earnings: 16500},
      {quarter: 3, earnings: 14250},
      {quarter: 4, earnings: 19000}
    ];    
    // if (this.props.topVertical){
    return (
      <View>
        <VictoryPie
          endAngle={90}
          innerRadius={90}
          padAngle={5}
          startAngle={-90}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(NumConnectGraph);

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


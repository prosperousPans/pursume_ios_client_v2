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

export class TopReasonGraph extends Component {
  constructor (props){
    super();
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
          style={{
            labels: {
              fill: "white",
              stroke: "none",
              fontSize: 15,
              fontWeight: "bold"
            }
          }}
          data={[
            { x: "<5", y: 6279 },
            { x: "5-13", y: 9182 },
            { x: "14-17", y: 5511 },
            { x: "18-24", y: 7164 },
            { x: "25-44", y: 6716 },
            { x: "45-64", y: 4263 },
            { x: "≥65", y: 7502 }
          ]}
          innerRadius={70}
          labelRadius={100}
          colorScale={[
            "#D85F49",
            "#F66D3B",
            "#D92E1D",
            "#D73C4C",
            "#FFAF59",
            "#E28300",
            "#F6A57F"
          ]}
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

export default connect(mapStateToProps, mapDispatchToProps)(TopReasonGraph);

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


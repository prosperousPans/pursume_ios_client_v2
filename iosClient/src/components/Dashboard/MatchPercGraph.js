import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';

import { VictoryPie } from "victory-native";

export class MatchPercGraph extends Component {
  render() {
    let allViews = this.props.allConnect.length;
    let meets = this.props.allAccept.length;
    let pass = allViews - meets;

    return (
      <View style={styles.graphContainer}>
        <Text style={styles.medText}><Text style={styles.medTextBold}>Overall Accept Rate: </Text>{Math.floor(this.props.percentMatches*100)}%</Text>
        <Text style={styles.medText}><Text style={styles.medTextBold}>Total Profile Views: </Text>{allViews}</Text>
        <VictoryPie
          endAngle={90}
          innerRadius={60}
          padAngle={5}
          startAngle={-90}
          responsive={true}
          padding={80}
          data={[
            {x: `Meet - ${meets}`, y: meets},
            {x: `Pass - ${pass}`, y: pass}
          ]}          
          colorScale={[
            "#2B98F0",
            "grey"
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
    allConnect: state.Dashboard.allConnect, //all users that viewed you
    allAccept: state.Dashboard.allAccept, //all users that accepted you
    percentMatches: state.Dashboard.percentMatches,
    topReason: state.Dashboard.topReason,
    topVertical: state.Dashboard.topVertical
  }
};

export default connect(mapStateToProps)(MatchPercGraph);

const styles = StyleSheet.create({
  graphContainer: {
    alignSelf: 'center',
    padding: 12
  },  

  medTextBold: {
    alignSelf: 'center',      
    color: 'grey',
    fontFamily: 'Avenir-Medium',    
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',    
  }, 
  medText: {
    alignSelf: 'center',      
    color: 'grey',
    fontFamily: 'Avenir-Medium',    
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',    
  }
})


import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel} from "victory-native";

export class TopReasonGraph extends Component {
  render() {
    var data = [];
    for (var key in this.props.allIndustry) {
      data.push({industry: key, count: this.props.allIndustry[key]})
    }

    return (
      <View style={styles.graphContainer}>
        <Text style={styles.medText}><Text style={styles.medTextBold}>Top Industry of Connections: </Text>{this.props.topVertical}</Text>
        <VictoryChart
          domainPadding={10}
        >
          <VictoryAxis
          />    
          <VictoryBar
            responsive={true}
            style={{
              data: {width: 30, fill: (d) => d.y > 0 ? "grey" : "blue"},
              tickLabels: {angle: -90}            
            }}
            data={data}
            x="industry"
            y='count'
          />
        </VictoryChart>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    allConnect: state.Dashboard.allConnect, //all users that viewed you
    allAccept: state.Dashboard.allAccept, //all users that accepted you
    percentMatches: state.Dashboard.percentMatches,
    topReason: state.Dashboard.topReason,
    topVertical: state.Dashboard.topVertical,
    allIndustry: state.Dashboard.allIndustry
  }
};

export default connect(mapStateToProps)(TopReasonGraph);

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


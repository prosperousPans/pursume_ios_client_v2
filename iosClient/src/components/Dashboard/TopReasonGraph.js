import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';

import { VictoryBar, VictoryPie } from "victory-native";

export class TopReasonGraph extends Component {
  render() {
    var allAcceptObj = {};

    for (var i=0; i<this.props.allAccept.length; i++) {
      var reason = this.props.allAccept[i].reason;
      if (allAcceptObj[reason]) { allAcceptObj[reason]++;
      } else { allAcceptObj[reason] = 1; }
    }
    let personal = allAcceptObj.personal || 0;
    let education = allAcceptObj.education || 0;
    let professional = allAcceptObj.professional || 0;
    let project = allAcceptObj.project || 0;

    return (
      <View style={styles.graphContainer}>
        <Text style={styles.medText}><Text style={styles.medTextBold}>Top Reason for Connect: </Text>{this.props.topReason}</Text>
        <VictoryPie
          responsive={true}
          padding={{top: 30,left:65, right:65}}
          style={{
            labels: {
              fill: "white",
              stroke: "none",
              fontSize: 10,
              fontWeight: "bold"
            }
          }}
          data={[
            {x: `Personal: ${personal}`, y: personal},
            {x: `Education: ${education}`, y: education},
            {x: `Professional: ${professional}`, y: professional},
            {x: `Project: ${project}`, y: project}
          ]}
          innerRadius={55}
          labelRadius={65}
          colorScale={[
            "#2B98F0",
            "#515153",
            "#6F6B6C",
            "#C9C9C9"
          ]}
        />
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
    topVertical: state.Dashboard.topVertical
  }
};

export default connect(mapStateToProps)(TopReasonGraph);

const styles = StyleSheet.create({
  //padding 
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


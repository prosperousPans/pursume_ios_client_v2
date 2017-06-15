import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class Summary extends Component{
  constructor (props) {
    super(props);
  }

  render(){
    const quoteIconLeft = (<Icon name="quote-left" size={20} color="#2196F3" />)
    const quoteIconRight = (<Icon name="quote-right" size={20} color="#2196F3" />)

    return(
      
      (this.props.summaryInfo !== '') ? 
      <View style={styles.mainContainer}>
      <View style={styles.quoteContainerLeft} ><Text style={styles.textContainer} >{quoteIconLeft}</Text></View> 
        <View style={styles.contentContainer}>
            <Text style={styles.rowTitle}>{this.props.summaryInfo.data.summary}</Text>
        </View> 
      <View style={styles.quoteContainerRight}><Text style={styles.textContainer} >{quoteIconRight}</Text></View> 
      </View> 
      :  
      <View style={styles.detailContainer}>
          <Text style={styles.rowTitle}>Add a short, friendly bio</Text><Text style={styles.addDetailsSymbol}>+</Text>
      </View>
    
    );
  }
}

var styles = StyleSheet.create({
    container:{
      fontFamily: 'Avenir-Medium'
    },
    mainContainer:{
      flexDirection:'row', 
      justifyContent: 'space-between',
      flexWrap : 'wrap',
    },
    quoteContainerLeft:{
      marginLeft:15,
      width:30
    },
    quoteContainerRight:{
      marginLeft:15,
      width:30,
      marginTop:50
    },
    textContainer:{
      fontSize: 30,
      fontFamily: 'Avenir-Medium',
      color: '#2196F3', 
      textAlign:'left',
    },
    detailContainer: {
      flexDirection:'row', 
      flexWrap:'wrap'
    },
    contentContainer:{
      marginLeft:3,
      marginRight:3,
      width:250,
      flexWrap:'wrap',
    },
    rowTitle: {
      color: 'grey',
      fontSize: 14,
      fontFamily: 'Avenir-Medium',
      fontStyle: 'italic'
    },
    addDetailsSymbol: {
      color: 'orange',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'right',
      fontFamily: 'Avenir-Medium'
    },
    rowContent: {
      fontSize: 13,
      fontFamily: 'Avenir-Medium'
    }
});

module.exports = Summary;
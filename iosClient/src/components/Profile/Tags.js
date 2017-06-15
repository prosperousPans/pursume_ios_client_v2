import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	TouchableHighlight,
  AsyncStorage,
  ListView,
} from 'react-native';

class Tags extends Component{
  constructor (props) {
    super(props);
  }

  render(){
    if(this.props.tagInfo && this.props.tagInfo.data ){
      var list = this.props.tagInfo.data.map(function(tag, index){
        return (
            <View key={index} style={styles.tagBox} >
              <Text style={styles.tagContent}>#{tag.tag}</Text> 
            </View>
          )
        })
    } 
  	return(
      (this.props.tagInfo && this.props.tagInfo.data) ? 
        <View style={styles.detailContainer}>
          {list}
        </View>
      :  
      <View>
        <View style={styles.detailContainer}>
						<Text style={styles.rowTitle}>Tags</Text><Text style={styles.addDetailsSymbol}>+</Text>
        </View>
        <Text style={styles.rowContent}>Add Tags</Text>
      </View>
  		);
  }
} 

var styles = StyleSheet.create({
  container:{
    fontFamily: 'Avenir-Medium'
  },
  detailContainer: {
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'space-between',
    paddingLeft:35,
    paddingRight:30
  },
  rowTitle: {
    color: 'orange',
    fontSize: 15,
    fontFamily: 'Avenir-Medium'
  },
  addDetailsSymbol: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: 'Avenir-Medium'
  },
  rowContent: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    padding: 5,
  },
  tagBox: {
    borderWidth:1,
    borderRadius:7,
    // borderColor: '#646464',
    borderColor:'#2196F3',
    margin: 5,
  },
  tagContent: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    color: '#646464'
  }
});

module.exports = Tags;
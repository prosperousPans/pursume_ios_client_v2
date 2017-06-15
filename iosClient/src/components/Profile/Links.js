import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	TouchableHighlight,
	AsyncStorage
 } from 'react-native';

class Links extends Component{
  constructor (props) {
    super(props);
  }

  render(){
  	return(
  		<View>
          <View style={styles.container}>
 							<Text style={styles.name}>Links</Text>
          </View>
      </View>
  		);
  }
}

var styles = StyleSheet.create({
    containerProfile:{
        flexDirection: 'row',
        marginLeft: 10,
        padding:5
    },
    container: {
    	paddingTop: 20,
        height:55,
    },
    image:{
      height: 40,
      borderRadius: 20,
      width: 40,
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        fontSize: 18,
        paddingBottom: 5,
        paddingTop:5,
        paddingLeft:20,
        fontFamily: 'Avenir-Medium'
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    },
    text: {
      fontSize: 24,
      marginTop: 300,
      color: 'black',
      alignSelf: 'center'
  }
});

module.exports = Links;
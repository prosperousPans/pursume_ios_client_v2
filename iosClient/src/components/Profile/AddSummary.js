import React, { Component } from 'react';
import { 
	View, 
	Text,
  TextInput, 
	StyleSheet,
	TouchableHighlight,
  Button,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


class AddSummary extends Component{
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  componentWillMount(){
    if(this.props.summaryInfo && this.props.summaryInfo.data){
      this.setState({
        text: this.props.summaryInfo.data.summary
      })
    }
  }

  handleChange(event){
    this.setState({
      text: event.nativeEvent.text
    })
  }

  handleCancel(event){
    this.setState({
      text: ''
    })
  }

  handleOk(event){
    this.addSummaryDetails();
  }

  handleBack(tag){
    this.props.navigator.pop();
  }

  async addSummaryDetails(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var config = {
          headers:{'Authorization': 'Bearer '+result[1][1] }
        }
        var options = {
          authid: result[0][1],
          text: this.state.text
        }
        axios.post('http://localhost:3000/profile-user/add-summary', options, config)
        .then( result => {
          console.log('Add Summary results:','Successful');
        })
        .catch( error => {
          console.log('error: ', error);
        })
      })
    }catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


  render(){
    const backIcon = (<Icon name="arrow-circle-left" size={30} color="#2196F3" />)
  	return(
      <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TouchableHighlight
            style={styles.backIcon}
            onPress={ ()=>{this.handleBack()}}
            >{backIcon}</TouchableHighlight>
            <Text style={styles.titleText}>Write a short bio</Text>
          </View>
          <Text style={styles.charDisplay}>250 left</Text>
          <View style={styles.summaryContainer}>
            <TextInput 
              style={styles.searchInput}
              multiline={true}
              numberOfLines={5}
              onChangeText={(text) => this.setState({text})}
              placeholder= {'Introduce yourself and say what kind of people you\'d like to meet...' }
              placeholderTextColor='grey'
              value={this.state.text} />
          </View>
              <View style={styles.tagRowContainer}>
                <Button
                  onPress={this.handleCancel.bind(this)}
                  title="Clear"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
                <Button
                  onPress={this.handleOk.bind(this)}
                  title="Ok"
                  color="#841584"
                  accessibilityLabel="Learn more about this purple button"
                />
          </View>
      </View>
  		);
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: 10,
    backgroundColor: '#F3F3F3'
  },
  tagContainer:{
    flexDirection: 'row',
    margin: 5,
    padding:8,
    justifyContent: 'space-between'
  },
  tagRowContainer:{
    flexDirection: 'row',
    margin: 5,
    padding:8,
    justifyContent: 'space-between'
  },
  summaryContainer:{
    backgroundColor: '#FFFFFF'
  },
  searchInput: {
    height: 100,
    padding: 4,
    margin: 5,
    fontSize: 14,
    color: '#525050',
    fontFamily: 'Avenir-Medium',
  },
  charDisplay:{
    height: 30,
    padding: 4,
    fontSize: 15,
    textAlign: 'right',
    fontFamily: 'Avenir-Medium',
  },
  backIcon:{
    margin: 15,
  },
  titleContainer:{
    flexDirection: 'row',
    margin: 5,
    padding:8,
  },
  titleText:{
    marginTop: 12,
    marginLeft: 25,
    textAlign: 'center',
    fontFamily: 'Avenir-Medium',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2196F3'
    },
});


module.exports = AddSummary;
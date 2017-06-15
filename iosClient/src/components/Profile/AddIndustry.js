import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  ScrollView
} from 'react-native';
import Separator from '../Utilities/Separator';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


class AddIndustry extends Component{
  constructor (props) {
    super(props);
    this.state = {
      industry: '',
      selectedIndustry:this.props.industryInfo && this.props.industryInfo.data ?this.props.industryInfo.data.vertical:''
    }
  }

  updateIndustry(industry){
    this.setState({
      'selectedIndustry': industry
    });
    this.updateIndustryDetails();
  }

  handleBack(tag){
    this.props.navigator.pop();
  }

  async updateIndustryDetails(){
    try {  
      await AsyncStorage.multiGet(['userId','AuthToken' ], (err, result) => {
        var config = {
          headers:{'Authorization': 'Bearer '+result[1][1] }
        }
        var options = {
          authid: result[0][1],
          industry: this.state.selectedIndustry
        }
        axios.post('http://localhost:3000/profile-user/update-Industry', options, config)
        .then( result => {
          console.log('Add Industry results:','Successful');
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
    const backIcon = (<Icon name="arrow-circle-left" size={30} color="#2196F3" />);
    var userInfo = this.props.data;
    var industryValues = ['Technology', 'BioMedical', 'Education', 'Finance/Banking', 'Retail/Ecommerce', 'Leisure/Travel', 'Gaming', 'Hardware', 'Enterprise Software/SAAS', 'Social', 'Service', 'Other'];
    var context = this;
    const checkIcon = (<Icon name="check" size={18} color="#2196F3" />)
    var list = industryValues.map(function(industry, index){
      if(industryValues.length === 0){
        return <View key={index}/>
      } else {
        return (
          <View key={index} style={styles.content} >
            <TouchableHighlight
            onPress={ context.updateIndustry.bind(context, industry) }
            underlayColor='transparent'
            ><View style={styles.industryContainer}>
            <Text style={styles.content}>{industry}</Text>
            { context.state.selectedIndustry == industry && <View ><Text style={styles.content}>{checkIcon}</Text></View>}
            </View>
            </TouchableHighlight>
            <Separator/>  
          </View>
        )
      }
    })
    return(
      (userInfo) ? <View/> :  
      <ScrollView style={styles.detailContainer}>
        <View style={styles.titleContainer}>
          <TouchableHighlight
          style={styles.backIcon}
          onPress={ ()=>{this.handleBack()}}
          >{backIcon}</TouchableHighlight>
          <Text style={styles.titleText}>My Industry</Text>
        </View>
        {list}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    fontFamily: 'Avenir-Medium'
  },
  detailContainer: {
    flexDirection:'column', 
    flexWrap:'wrap',
    marginTop: 10
  },
  industryContainer: {
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'space-between'
  },
  content: {
    fontSize: 15,
    fontFamily: 'Avenir-Medium',
    padding: 5,
    marginLeft: 6,
    marginRight: 6
  },
  mark: {
    color: '#48BBEC',
    fontSize: 15,
    fontFamily: 'Avenir-Medium',
    padding: 5,
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
    marginLeft: 45,
    textAlign: 'center',
    fontFamily: 'Avenir-Medium',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2196F3'
    },
});

module.exports = AddIndustry;
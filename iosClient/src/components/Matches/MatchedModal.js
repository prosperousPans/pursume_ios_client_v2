import React, {Component} from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Image,
  Switch,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

export class MatchedModal extends Component{

  render() {
  let currentProfile = this.props.currentMatch.profile[0];
  const githubIcon = (<Icon name="github" size={22} color="white" />)
  const linkedInIcon = (<Icon name="linkedin-square" size={20} color="white" />)  
    return (
      <View style={styles.card}>
        <View style={{padding:30}}>
          <Text style={styles.bigText}>You're Connected!</Text>
        </View>
        <Image
          source={{uri: currentProfile.image}}
          style={styles.container}
          blurRadius={45}
        >
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: currentProfile.image}} />
          </View>
          <Text style={styles.name}>{currentProfile.full_name}</Text>
          <Text style={styles.handle}>{currentProfile.vertical}</Text>
        </Image>        

        <View style={{padding:30}}>
          <Text style={styles.medText}>Wants to meet you too!</Text>
          <Text style={styles.smallText}>Start a conversation in chats now!</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    currentMatch: state.Matches.currentMatch
  }
};

export default connect(mapStateToProps)(MatchedModal);

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: height*0.3,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,       
  },

  bigText: {
    alignSelf: 'center',  
    color: '#2196F3',
    fontSize: 32,
    fontFamily: 'Avenir-Medium',        
    fontWeight: 'bold',
  },
  medText: {
    alignSelf: 'center',   
    fontFamily: 'Avenir-Medium',    
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',    
  },
  smallText: {
    alignSelf: 'center',      
    fontFamily: 'Avenir-Medium',    
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6F6B6C',    
  },


  container: {
    height: 225,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.2)'
  },
  imageContainer: {
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 130,
    width: 130,
    borderWidth: 2.8,
    borderColor: '#d6d7da',
    borderRadius: 65,
    marginTop: 5,
    alignSelf: 'center'
  },
  name: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Avenir-Medium',
    fontWeight: 'bold'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white',
    backgroundColor: 'transparent',
    fontFamily: 'Avenir-Medium'
  },  
  links:{
    margin:5,
    marginTop:2
  },  
})



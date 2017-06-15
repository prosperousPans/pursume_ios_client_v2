import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	Image,
  AsyncStorage,
  TouchableHighlight,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Badge extends Component{
  constructor(props){
    super(props);
  }

  goToGithub() {
    Linking.canOpenURL('https://www.github.com/').then(supported => {
      if (supported) {
        var url = this.props.imageInfo.data.github_url        
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.imageInfo.data.github_url);
      }
    });
  }

  goToLinkedIn() {
    Linking.canOpenURL('https://www.linkedin.com/').then(supported => {
      if (supported) {
        var url = this.props.imageInfo.data.linkedin_url        
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.imageInfo.data.github_url);
      }
    });
  }

	render(){ 
    const githubIcon = (<Icon name="github" size={22} color="white" />)
    const linkedInIcon = (<Icon name="linkedin-square" size={20} color="white" />)
    const experience = this.props.experience;
    var currentPosition = "";
    var organization = ""; 
    var end_date =-1;
    if(experience && experience.data  && experience.data.length>0 ){
      for (var current of experience.data ){
        if(current.name ==="professional" && current.end_date > end_date){
          currentPosition = current.role;
          organization = current.organization;
          end_date = current.end_date;
        }
      }
    }

		return(
      (this.props.userDetails === '' || !this.props.imageInfo) ? <View/> : 
			<Image
      source={{uri: this.props.imageInfo.data.image}}
      style={styles.container}
      blurRadius={45}>
        <View style={styles.imageContainer}>
  				<Image style={styles.image} source={{uri: this.props.imageInfo.data.image}} />
          <View>
            <TouchableHighlight 
            style={styles.links} 
            underlayColor="transparent"  
            onPress={ () => this.goToGithub() }>
            {githubIcon}
            </TouchableHighlight>
            <TouchableHighlight 
            style={styles.links} 
            underlayColor="transparent"  
            onPress={ () => this.goToLinkedIn() }>
            {linkedInIcon}
            </TouchableHighlight>
          </View>
        </View>
				<Text style={styles.name}>{this.props.imageInfo.data.full_name}</Text>
				<Text style={styles.handle}>{currentPosition} at {organization}</Text>
			</Image>
			)
	}
}

module.exports = Badge;

var styles = StyleSheet.create({
  container: {
    height: 240,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.2)'
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
  image: {
    height: 130,
    width: 130,
    borderWidth: 2.8,
    borderColor: '#d6d7da',
    borderRadius: 65,
    marginTop: 5,
    alignSelf: 'center'
  },
  urlContainer: {
    flexDirection:'column', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  links:{
    margin:5,
    marginTop:2
  }
});

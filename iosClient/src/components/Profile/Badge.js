import React, { Component } from 'react';
import { 
	View, 
	Text, 
	StyleSheet,
	Image,
    AsyncStorage
	 } from 'react-native';
// import axios from 'axios';

var styles = StyleSheet.create({
    container: {
        height: 225,
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
    }
});

class Badge extends Component{
    constructor(props){
        super(props);
    }

	render(){ 
        console.log(this.props.experience);

    var experience = this.props.experience;
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
				<Image style={styles.image} source={{uri: this.props.imageInfo.data.image}} />
				<Text style={styles.name}>{this.props.imageInfo.data.full_name}</Text>
				<Text style={styles.handle}>{currentPosition} at {organization}</Text>
			</Image>
			)
	}
}

module.exports = Badge;

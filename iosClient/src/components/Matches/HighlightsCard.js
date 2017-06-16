import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { getMatches } from '../../actions/Matches';

import Icon from 'react-native-vector-icons/FontAwesome';
import Separator from '../Utilities/Separator';

export class HighlightsCard extends Component {
  constructor (props){
    super();
    this.handleGitClick = this.handleGitClick.bind(this);
    this.handleLNKDClick = this.handleLNKDClick.bind(this);
  }

  handleGitClick() {
    Linking.canOpenURL('https://www.github.com/').then(supported => {
      if (supported) {
        var url = this.props.currentMatch.profile[0].github_url        
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  }
  
  handleLNKDClick() {
    Linking.canOpenURL('https://www.linkedin.com/').then(supported => {
      if (supported) {
        var url = this.props.currentMatch.profile[0].linkedin_url
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  }

  render() {
    let currentProfile = this.props.currentMatch.profile[0];
    if (currentProfile.summary.length > 180) {
      currentProfilePersonal = currentProfile.summary.substring(0,100) + '...';
    } else {
      currentProfilePersonal = currentProfile.summary;
    }
    let currentMatchEduExp = this.props.currentMatch.eduExp;
    let currentMatchProfExp = this.props.currentMatch.profExp;
    let currentMatchProjExp = this.props.currentMatch.projExp;
    const industryIcon = (<Icon name="industry" size={15} color="#2196F3" />)
    const educationIcon = (<Icon name="graduation-cap" size={15} color="#2196F3" />)
    const professionalIcon = (<Icon name="building-o" size={15} color="#2196F3" />)
    const projectIcon = (<Icon name="laptop" size={15} color="#2196F3" />)
    const quoteIconLeft = (<Icon name="quote-left" size={15} color="#2196F3" />)
    const quoteIconRight = (<Icon name="quote-right" size={15} color="#2196F3" />)

    const githubIcon = (<Icon name="github" size={22} color="white" />)
    const linkedInIcon = (<Icon name="linkedin-square" size={20} color="white" />)

    console.log('currentProfile', currentProfile);
    return (
      <ScrollView >
          <View>
            <Image
            source={{uri: currentProfile.image}}
            style={styles.container}
            blurRadius={45}>

              <View style={styles.imgHeader}>
                <Image style={styles.image} source={{uri: currentProfile.image}} />
                <View>
                  <TouchableHighlight 
                    style={styles.links} 
                    underlayColor="transparent"  
                    onPress={this.handleGitClick}>
                    {githubIcon}
                  </TouchableHighlight>
                  <TouchableHighlight 
                    style={styles.links} 
                    underlayColor="transparent"  
                    onPress={this.handleLNKDClick}>
                    {linkedInIcon}
                  </TouchableHighlight>
                </View>
              </View>
              <View style= { styles.nameSection }>
                <Text style={styles.nameText}>{currentProfile.full_name}</Text>
                <Text style={styles.industryText}>{currentProfile.vertical}</Text>
              </View>
                
            </Image>        
              
          </View>


        <View>
          <Separator/>

          <View style={styles.rowContainer} >
            <View style={styles.detailContainer} >
              <View style={styles.titleContainer}>
                <Text>{quoteIconLeft}</Text>
              </View>
              <View style={styles.contentContainer}>              
                <Text style={styles.personalContent}>{currentProfilePersonal} </Text>
              </View>
              <View style={styles.quoteContainerRight}>
                <Text>{quoteIconRight}</Text>
              </View>
            </View> 
          </View>


          <Separator/>

          <View style={styles.rowContainer} >
            <View style={styles.detailContainer} >
              <View style={styles.titleContainer}>
                <Text>{educationIcon} <Text style={styles.rowTitle}> Education:</Text></Text>

              </View>
              <View style={styles.contentContainer}>              
                <Text style={styles.contentBold}>{currentMatchEduExp[0].organization}, </Text>
                <Text style={styles.content}>{currentMatchEduExp[0].role}</Text>
              </View> 
            </View> 
          </View>

          <Separator/>

          <View style={styles.rowContainer} >
            <View style={styles.detailContainer} >
              <View style={styles.titleContainer}>
                <Text>{professionalIcon} <Text style={styles.rowTitle}>  Professional:</Text></Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.contentBold}>{currentMatchProfExp[0].organization}, </Text>
                <Text style={styles.content}>{currentMatchProfExp[0].role}</Text>
              </View>
            </View> 
          </View>

          <Separator/>
          
          <View style={styles.rowContainer} >
            <View style={styles.detailContainer} >
              <View style={styles.titleContainer}>
                <Text>{projectIcon} <Text style={styles.rowTitle}> Project:</Text></Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.contentBold}>{currentMatchProjExp[0].role}</Text>
              </View>              
            </View> 
          </View>

          <Separator/>

        </View>

      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    allMatches: state.Matches.allMatches,
    currentMatch: state.Matches.currentMatch
  }
};

export default connect(mapStateToProps)(HighlightsCard);

const styles = StyleSheet.create({
  //padding 
  rowContainer: {
    padding: 12
  },


  //name + industry section 
  nameSection: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10    
  },  
  nameText: {
    alignSelf: 'center',  
    color: 'white',
    fontFamily: 'Avenir-Medium',    
    fontSize: 25,
    fontWeight: 'bold',
  },
  industryText: {
    alignSelf: 'center',      
    color: 'white',
    fontFamily: 'Avenir-Medium',    
    fontSize: 15,
  },

  //profile pic, git + linkedin icons
  container: {
    height: 225,
    paddingTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.2)'
  },
  
  imgHeader: {
    flexDirection: 'row',
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

  //personal quotes
  mainContainer:{
    flexDirection:'row', 
    justifyContent: 'space-between',
    flexWrap : 'wrap',
    padding: 10 
  },
  quoteContainerLeft:{
    marginLeft:15,
    width:30
  },
  quoteContainerRight:{
    marginLeft:300,
    width:30
  },
  contentContainer:{
    marginLeft:3,
    marginRight:3,
    width:250,
    flexWrap:'wrap',
  },  
  personalContent: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Avenir-Medium',
    fontStyle: 'italic',
    marginLeft:25,
  }, 


  //edu, prof, proj section
  titleContainer: {
    flexDirection:'row', 
  },
  rowTitle: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Medium',
    fontWeight: 'bold',
    color: '#2196F3',
  },
  detailContainer: {
    flexDirection:'column', 
    flexWrap:'wrap',
    justifyContent: 'space-between',
    paddingRight:30,
    paddingLeft:15
  },
  contentContainer: {
    flexDirection:'row', 
    flexWrap:'wrap',
    marginRight: 30  
  },  
  contentBold: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    marginLeft: 25,
    color: 'black',
    fontWeight: 'bold',    
  },
  content: {
    fontSize: 13,
    fontFamily: 'Avenir-Medium',
    color: '#525050',
  },

})




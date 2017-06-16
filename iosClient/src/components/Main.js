import React, {Component} from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NavigatorIOS,
} from 'react-native';
import {
  createNavigator,
  createNavigationContainer,
  TabRouter,
  addNavigationHelpers,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import Matches from './Matches/Matches.js';
import Dashboard from './Dashboard/Dashboard.js';
import ChatMain from './Chat/ChatMain.js';
import Profile from './Profile/Profile.js';
import ProfileMain from './Profile/ProfileMain.js';
import Separator from './Utilities/Separator';


const ProfileScreen = () => (
  <ProfileMain />
);
const MatchesScreen = () => (
  <Matches />
);

const DashboardScreen = () => (
  <Dashboard />
);

const ChatScreen = () => (
  <ChatMain />
);

const CustomTabBar = ({ navigation }) => {
  const { routes } = navigation.state;
  const profileIcon = (<Icon name="user-o" size={25} color="grey" />)  
  const dashIcon = (<Icon name="pie-chart" size={25} color="grey" />)  
  const homeIcon = (<Icon name="users" size={25} color="grey" />)  
  const chatIcon = (<Icon name="comments-o" size={30} color="grey" />)  
  return (
    <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.tab}
          key={'Profile'}
        >     
          <Text style={styles.text}>{profileIcon}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.tab}
          key={'Dashboard'}
        >     
          <Text style={styles.text}>{dashIcon}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.tab}
          key={'Home'}
        >     
          <Text style={styles.text}>{homeIcon}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          style={styles.tab}
          key={'Chat'}
        >     
          <Text style={styles.text}>{chatIcon}</Text>
        </TouchableOpacity>                        
    </View>
  );
};

const CustomTabView = ({ router, navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = router.getComponentForState(navigation.state);
  return (
    <View style={styles.container}>
      <CustomTabBar navigation={navigation} />
      <Separator />
      <ActiveScreen
        navigation={addNavigationHelpers({
          ...navigation,
          state: routes[index],
        })}
      />
    </View>
  );
};

const CustomTabRouter = TabRouter(
  {
    Profile: {
      screen: ProfileScreen,
      path: 'profile',
    },

    Dashboard: {
      screen: DashboardScreen,
      path: 'dashboard',
    },
    Home: {
      screen: MatchesScreen,
      path: '',
    },
    Chat: {
      screen: ChatScreen,
      path: 'chat',
    },
  },
  {
    // Change this to start on a different tab
    initialRouteName: 'Home',
  }
);

const Main = createNavigationContainer(
  createNavigator(CustomTabRouter)(CustomTabView)
);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },  
  tabContainer: {
    flexDirection: 'row',
    height: 48,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'grey',
  },
  text: {
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Medium',    
  }    
});

export default Main;


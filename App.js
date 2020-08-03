import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/Octicons';
import {Home, Favorites} from './main/screens/index';

const Tabs = AnimatedTabBarNavigator();

// setup animated tab navigator with two screens > home and favorites

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          activeTintColor: '#2d3436',
          inactiveTintColor: '#000000',
          activeBackgroundColor: '#FFCF64',
          labelStyle: {
            fontWeight: 'bold',
          },
        }}
        appearence={{
          floating: false,
          shadow: true,
          topPadding: 10,
          horizontalPadding: 50,
        }}
        initialRouteName="Home">
        <Tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Icon name="home" size={24} color="#2d3436" />,
          }}
        />
        <Tabs.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: () => <Icon name="star" size={24} color="#2d3436" />,
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;

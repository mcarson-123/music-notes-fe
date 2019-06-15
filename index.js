/**
 * @format
 */

import React from 'react';
import { View, AppRegistry, SafeAreaView, StatusBar } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import {name as appName} from './app.json';
import Quiz from './src/components/view/Quiz';
import SideMenu from './src/components/partial/SideMenu';
import { colors } from '/config/styles.config';

    // <StatusBar backgroundColor="blue" translucent barStyle="light-content" />
// Create a component
const App = () => (
  <View style={{flex: 1}}>
    <Quiz />
  </View>
);


// AppRegistry.registerComponent(appName, () => App);

const AppNavigator = createStackNavigator({
  Home: {
    screen: Quiz
  },
  Menu: {
    screen: SideMenu
  }
});

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppNavigator
    }
  },
  {
    contentComponent: SideMenu
  }
);

// export default createAppContainer(AppNavigator);

AppRegistry.registerComponent(appName, () => createAppContainer(DrawerNavigator))

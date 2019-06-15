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

const App = () => (
  <SafeAreaView style={{flex: 1}}>
    <Quiz />
  </SafeAreaView>
);

const AppNavigator = createStackNavigator({
  Home: {
    screen: Quiz
  },
});

AppRegistry.registerComponent(appName, () => createAppContainer(AppNavigator))

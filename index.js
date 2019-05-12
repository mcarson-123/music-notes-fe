/**
 * @format
 */

import React from 'react';
import { View, Text, AppRegistry, SafeAreaView } from 'react-native';
import {name as appName} from './app.json';
import Quiz from './src/components/view/Quiz';

// Create a component
const App = () => (
  <SafeAreaView style={{flex: 1}}>
    <Text>Learn your notes</Text>
    <Quiz />
  </SafeAreaView>
);


AppRegistry.registerComponent(appName, () => App);

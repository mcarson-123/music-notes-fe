/**
 * @format
 */

import React from 'react';
import { View, AppRegistry, SafeAreaView } from 'react-native';
import {name as appName} from './app.json';
import Quiz from './src/components/view/Quiz';
import { colors } from '/config/styles.config';

// Create a component
const App = () => (
  <SafeAreaView style={{flex: 1, backgroundColor: colors.fourLight}}>
    <Quiz />
  </SafeAreaView>
);


AppRegistry.registerComponent(appName, () => App);

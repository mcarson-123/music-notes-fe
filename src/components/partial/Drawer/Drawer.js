import React from 'react';

import { View, TouchableOpacity, Platform, Dimensions } from 'react-native';

import BottomDrawer from 'rn-bottom-drawer';

import Text from '/components/base/Text';

import styles from './Drawer.styles';

import { colors1, colors2, colors3, themes } from '/config/styles.config';

class Drawer extends React.PureComponent {

  render() {
    const backgroundColor = themes[this.props.colorScheme].backgroundDarker
    const textColor = themes[this.props.colorScheme].primary

    // The BottomDrawer component doesn't seem to obey the save area view
    // at the bottom for the iPhoneX, this is a hack to ensure it looks correct
    const isIos = Platform.OS === 'ios';
    const isIphoneX = isIos && Dimensions.get('window').height === 812;
    const downDisplay = isIphoneX ? 210 : 246

    return(
      <BottomDrawer
          containerHeight={350}
          downDisplay={downDisplay}
          startUp={false}
          backgroundColor={backgroundColor}
        >
        <View style={styles.drawer}>
          <View style={styles.heading}>
            <Text textType='button' color={textColor}>Settings</Text>
          </View>
          <View style={styles.break}/>
          <View style={styles.section}>
            <Text textType='h1' color={textColor} style={styles.sectionHeading}>Color Options</Text>
            <View style={styles.colorSwatches}>
              <TouchableOpacity
                onPress={ () => {this.props.onColorPress(colors1.name) }}
              >
                <View style={[styles.colorSwatch, { backgroundColor: colors1.background, borderWidth: 1 }]}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ () => {this.props.onColorPress(colors2.name) }}
              >
                <View style={[styles.colorSwatch, { backgroundColor: colors2.primary }]}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ () => {this.props.onColorPress(colors3.name) }}
              >
                <View style={[styles.colorSwatch, { backgroundColor: colors3.primary }]}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.break}/>
        </View>
      </BottomDrawer>
    );
  }

}

export default Drawer;

import React from 'react';

import { View, TouchableOpacity, Platform, Dimensions, Image } from 'react-native';

import BottomDrawer from '/components/partial/BottomDrawer';

import Text from '/components/base/Text';

import bassClef from '/assets/staff/bass-clef.png';
import trebleClef from '/assets/staff/treble-clef.png';

import styles from './Drawer.styles';

import { colors1, colors2, colors3, themes } from '/config/styles.config';

import Icon from 'react-native-vector-icons/MaterialIcons';

class Drawer extends React.PureComponent {

  render() {
    const backgroundColor = themes[this.props.colorScheme].backgroundDarker
    const textColor = themes[this.props.colorScheme].primary

    return(
      <BottomDrawer backgroundColor={backgroundColor}>
        <View style={styles.container}>
          <View style={[styles.drawer, { backgroundColor: backgroundColor }]}>
            <View style={styles.section}>
              <Text textType='h1' color={textColor} style={styles.sectionHeading}>Color Options</Text>
              <View style={styles.optionsRow}>
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
            <View style={styles.section}>
              <Text textType='h1' color={textColor} style={styles.sectionHeading}>Clef</Text>
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  onPress={ () => {this.props.onClefPress('treble') }}
                >
                  <View style={styles.clefOption}>
                    <Image
                      style={styles.trebleClefImage}
                      source={trebleClef}
                      resizeMode='contain'
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={ () => {this.props.onClefPress('bass') }}
                >
                  <View style={styles.clefOption}>
                    <Image
                      style={styles.bassClefImage}
                      source={bassClef}
                      resizeMode='contain'
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.break}/>
          </View>
        </View>
      </BottomDrawer>
    );
  }

}

export default Drawer;

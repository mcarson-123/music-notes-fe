import React from 'react';

import { View, TouchableOpacity } from 'react-native';

import BottomDrawer from 'rn-bottom-drawer';

import Text from '/components/base/Text';

import styles from './Drawer.styles';

import { colors1, colors2 } from '/config/styles.config';

class Drawer extends React.PureComponent {

  render() {
    return(
      <BottomDrawer
          containerHeight={200}
          startUp={false}
          // offset={TAB_BAR_HEIGHT}
        >
        <View style={styles.drawer}>
          <View style={styles.heading}>
            <Text textType='button'>Settings</Text>
          </View>
          <View style={styles.section}>
            <Text textType='h1'>Settings</Text>
            <View style={styles.colorSwatches}>
              <TouchableOpacity
                onPress={ () => {this.props.onColorPress(colors1.name) }}
              >
                <View style={[styles.colorSwatch, { backgroundColor: colors1.primary }]}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={ () => {this.props.onColorPress(colors2.name) }}
              >
                <View style={[styles.colorSwatch, { backgroundColor: colors2.primary }]}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomDrawer>
    );
  }

}

export default Drawer;

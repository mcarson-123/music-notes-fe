import React from 'react';

import { View } from 'react-native';
import sample from 'lodash/sample';
import get from 'lodash/get';

import styles from './Staff.styles';

class Staff extends React.Component {

  render() {
    return(
      <View>
        <View style={styles.barLines}>
          <View style={styles.measure}>
            <View style={[styles.note, {marginTop: 20*(this.props.offset)}]}/>
            <View style={styles.singleBarLine}/>
            <View style={styles.singleBarLine}/>
            <View style={styles.singleBarLine}/>
            <View style={[styles.singleBarLine, styles.lastBarLine]}/>
          </View>
        </View>
      </View>
    );
  }
}

export default Staff;

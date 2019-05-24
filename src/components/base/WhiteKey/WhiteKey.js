import React from 'react';

import { View } from 'react-native';

import styles from './WhiteKey.styles';

class WhiteKey extends React.PureComponent {
  render() {
    const { leftMargin, lastChild } = this.props;

    const keyStyle = [styles.wrapper];
    if (leftMargin) {
      keyStyle.push(styles.leftMarginStyle)
    }
    // Faking the css nth child property for React Native
    if (lastChild) {
      keyStyle.push(styles.lastChild)
    }

    return(
      <View style={keyStyle} />
    );
  }

}

export default WhiteKey;

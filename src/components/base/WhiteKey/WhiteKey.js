import React from 'react';

import { View } from 'react-native';

import styles from './WhiteKey.styles';

class WhiteKey extends React.PureComponent {
  render() {
    const { lastChild, width, leftMarginWidth } = this.props;

    const keyStyle = [styles.wrapper];
    if (leftMarginWidth) {
      keyStyle.push({ marginLeft: -(leftMarginWidth / 2) })
    }
    // Faking the css nth child property for React Native
    if (lastChild) {
      keyStyle.push(styles.lastChild)
    }

    const height = 3.5 * width;
    return(
      <View style={[keyStyle, {width, height}]} />
    );
  }

}

export default WhiteKey;

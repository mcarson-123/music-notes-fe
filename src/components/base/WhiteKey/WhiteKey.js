import React from 'react';

import { View } from 'react-native';

import styles from './WhiteKey.styles';

class WhiteKey extends React.PureComponent {
  render() {
    const { leftMargin } = this.props;

    const keyStyle = [styles.wrapper];
    if (leftMargin) {
      keyStyle.push(styles.leftMarginStyle)
    }

    return(
      <View style={keyStyle} />
    );
  }

}

export default WhiteKey;

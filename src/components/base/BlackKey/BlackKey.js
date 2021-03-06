import React from 'react';

import { View } from 'react-native';

import styles from './BlackKey.styles';

class BlackKey extends React.PureComponent {
  render() {
    const { width, offset } = this.props;
    // Magic number below! There seemed to be no exact standard in piano
    // construction, so a number was chosen to make the keys look nice and
    // ensure the white keys are easily clickable
    const height = 4.2 * width;

    const marginLeft = (offset || 0) - (width/2)

    return(
      <View style={[styles.wrapper, {width, height, marginLeft: marginLeft}]} />
    );
  }

}

export default BlackKey;

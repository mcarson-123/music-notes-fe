import React from 'react';

import { Text } from 'react-native';

import styles from './Heading.styles';

class Heading extends React.PureComponent {
  render() {

    return(
      <Text style={styles.heading}>
        { this.props.children }
      </Text>
    );
  }

}

export default Heading;

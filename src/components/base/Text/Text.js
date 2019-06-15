import React from 'react';

import { Text as RNText } from 'react-native';

import PropTypes from 'prop-types';

import styles from './Text.styles';

class Text extends React.PureComponent {
  render() {
    const { textType } = this.props;

    let style;
    if ( textType === 'emphasized' ) {
      style = styles.emphasized;
    } else if ( textType === 'button' ) {
      style = styles.button;
    } else if ( textType === 'body' ) {
      style = styles.body;
    } else if ( textType === 'h1' ) {
      style = styles.h1;
    } else {
      style = {};
    }

    return(
      <RNText style={ [style, { color: this.props.color, ...this.props.style }] }>
        { this.props.children }
      </RNText>
    );
  }

}

Text.propTypes = {
  textType: PropTypes.oneOf(['emphasized', 'button', 'body', 'h1']),
};

export default Text;

import React from 'react';

import { View, TouchableOpacity, TouchableHighlight } from 'react-native';

import includes from 'lodash/includes';

class Key extends React.PureComponent {

  onButtonPress = () => {
    const correct =  includes(this.props.noteValue, this.props.note)
    console.log(correct);
  }

  render() {
    const { noteValue, zIndex, children } = this.props;

    return(
      <TouchableOpacity style={zIndex ? {zIndex: 100} : {}} onPress={this.onButtonPress}>
        { children }
      </TouchableOpacity>
    );
  }

}

export default Key;

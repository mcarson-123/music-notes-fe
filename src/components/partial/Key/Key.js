import React from 'react';

import { TouchableOpacity } from 'react-native';

class Key extends React.PureComponent {

  onButtonPress = () => {
    this.props.onNotePress(this.props.noteValue);
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

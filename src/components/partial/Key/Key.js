import React from 'react';

import { TouchableHighlight } from 'react-native';

class Key extends React.PureComponent {

  onButtonPress = () => {
    this.props.onNotePress(this.props.noteValue);
  }

  render() {
    const { noteValue, children } = this.props;

    return(
      <TouchableHighlight underlayColor={'blue'} onPress={this.onButtonPress}>
        { children }
      </TouchableHighlight>
    );
  }

}

export default Key;

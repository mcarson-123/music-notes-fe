import React from 'react';

import { View } from 'react-native';

import WhiteKey from '../../base/WhiteKey';
import BlackKey from '../../base/BlackKey';
import Key from '../../partial/Key';

import { spacings, screenWidth } from '/config/styles.config';

import styles from './Octave.styles';

class Octave extends React.PureComponent {
  render() {
    // Use rounding when calculating widths to ensure whole values
    // are used for displaying
    const width = screenWidth - ( 2*spacings.medium );
    const whiteKeyWidth = Math.round(width / 7); // 7 unique keys in an octave

    let blackKeyWidth = Math.round(whiteKeyWidth / 2);
    // Ensure width is an even number to allow the marginLeft offset
    // to be a whole number
    if ( blackKeyWidth % 2 != 0) {
      blackKeyWidth = blackKeyWidth + 1
    }

    return(
      <View style={styles.wrapper}>
        <Key
          onNotePress={this.props.onNotePress}
          note={this.props.note}
          noteValue={["C"]}
        >
          <WhiteKey width={whiteKeyWidth} />
        </Key>
        <BlackKey width={blackKeyWidth}/>
        <Key
          onNotePress={this.props.onNotePress}
          note={this.props.note}
          noteValue={["D"]}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth}/>
        </Key>
        <BlackKey width={blackKeyWidth}/>
        <Key
          onNotePress={this.props.onNotePress}
          note={this.props.note}
          noteValue={["E"]}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth}/>
        </Key>
        <Key
          onNotePress={this.props.onNotePress}
          note={this.props.note}
          noteValue={["F"]}
        >
          <WhiteKey width={whiteKeyWidth}/>
        </Key>
        <BlackKey width={blackKeyWidth}/>
        <Key
          onNotePress={this.props.onNotePress}
          note={this.props.note}
          noteValue={["G"]}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth}/>
        </Key>
        <BlackKey width={blackKeyWidth}/>
        <Key
          onNotePress={this.props.onNotePress}
          note={this.props.note}
          noteValue={["A"]}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth}/>
        </Key>
        <BlackKey width={blackKeyWidth}/>
        <Key
          onNotePress={this.props.onNotePress}
          note={this.props.note}
          noteValue={["B"]}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth} lastChild/>
        </Key>
      </View>
    );
  }

}

export default Octave;

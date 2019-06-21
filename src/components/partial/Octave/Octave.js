import React from 'react';

import { View } from 'react-native';

import WhiteKey from '../../base/WhiteKey';
import BlackKey from '../../base/BlackKey';
import Key from '../../partial/Key';

import { spacings, screenWidth } from '/config/styles.config';

import styles from './Octave.styles';

class Octave extends React.PureComponent {
  render() {
    const { note, onNotePress, highlightColor } = this.props;


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
          onNotePress={onNotePress}
          note={note}
          noteValue={["C"]}
          highlightColor={highlightColor}
        >
          <WhiteKey width={whiteKeyWidth} />
        </Key>
        <BlackKey offset={whiteKeyWidth} width={blackKeyWidth}/>
        <Key
          onNotePress={onNotePress}
          note={note}
          noteValue={["D"]}
          highlightColor={highlightColor}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth}/>
        </Key>
        <BlackKey offset={whiteKeyWidth * 2} width={blackKeyWidth}/>
        <Key
          onNotePress={onNotePress}
          note={note}
          noteValue={["E"]}
          highlightColor={highlightColor}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth}/>
        </Key>
        <Key
          onNotePress={onNotePress}
          note={note}
          noteValue={["F"]}
          highlightColor={highlightColor}
        >
          <WhiteKey width={whiteKeyWidth}/>
        </Key>
        <BlackKey offset={whiteKeyWidth * 4} width={blackKeyWidth}/>
        <Key
          onNotePress={onNotePress}
          note={note}
          noteValue={["G"]}
          highlightColor={highlightColor}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth}/>
        </Key>
        <BlackKey offset={whiteKeyWidth * 5} width={blackKeyWidth}/>
        <Key
          onNotePress={onNotePress}
          note={note}
          noteValue={["A"]}
          highlightColor={highlightColor}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth}/>
        </Key>
        <BlackKey offset={whiteKeyWidth * 6} width={blackKeyWidth}/>
        <Key
          onNotePress={onNotePress}
          note={note}
          noteValue={["B"]}
          highlightColor={highlightColor}
        >
          <WhiteKey width={whiteKeyWidth} leftMarginWidth={blackKeyWidth} lastChild/>
        </Key>
      </View>
    );
  }

}

export default Octave;

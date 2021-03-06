import React from 'react';

import { View, Image } from 'react-native';

import styles from './StaffTreble.styles';

import trebleClef from '/assets/staff/treble-clef.png';
import wholeNote from '/assets/staff/whole-note.png';

class StaffTreble extends React.Component {
  // The ledger line calculations are not particularly extensible, but
  // as currently there will only be a need for 2, there's no reason
  // yet to get exceptionally clever here.

  showPrimaryLedgerLine = () => {
    const noteOffset = this.props.offset;
    return (noteOffset > 4 || noteOffset < -1);
  }

  showSecondaryLedgerLine = () => {
    const noteOffset = this.props.offset;
    return (noteOffset < -2);
  }

  // Note: The ledger line is a box with a bottom border,
  // so there is some inherent offset from this.
  // Which is why the default is -20 not 0
  calcPrimaryLedgerLineOffset = () => {
    const noteOffset = this.props.offset;
    if (noteOffset > 4) {
      return 20*4;
    }
    if (noteOffset < -1) {
      return 20*(-2);
    }
    return -20;
  }

  calcSecondaryLedgerLineOffset = () => {
    const noteOffset = this.props.offset;
    if (noteOffset <= -2) {
      return 20*(-3);
    }
    return -20;
  }

  render() {
    // Note: 1 is removed from the note offset since the rotation of the note
    // then makes it not touch any staff lines above it. This lifts it up
    // slightly so it looks better.
    return(
      <View>
        <View style={styles.barLines}>
          <View style={styles.measure}>
            <Image
              style={[styles.clefImage, {width: 60, height: 140}]}
              source={trebleClef}
              resizeMode='contain'
            />
            <Image
              style={[styles.note, {marginTop: (20*(this.props.offset))}]}
              source={wholeNote}
              resizeMode='contain'
            />
            {
              this.showSecondaryLedgerLine() &&
              <View style={[styles.ledgerLine, {marginTop: this.calcSecondaryLedgerLineOffset()}]}/>
            }
            {
              this.showPrimaryLedgerLine() &&
              <View style={[styles.ledgerLine, {marginTop: this.calcPrimaryLedgerLineOffset()}]}/>
            }
            <View style={styles.singleBarLine}/>
            <View style={styles.singleBarLine}/>
            <View style={styles.singleBarLine}/>
            <View style={[styles.singleBarLine, styles.lastBarLine]}/>
          </View>
        </View>
      </View>
    );
  }
}

export default StaffTreble;

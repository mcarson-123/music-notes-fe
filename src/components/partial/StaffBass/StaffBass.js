import React from 'react';

import { View, Image } from 'react-native';

import styles from './StaffBass.styles';

import bassClef from '/assets/staff/bass-clef.png';
import wholeNote from '/assets/staff/whole-note.png';

class StaffBass extends React.Component {
  // The ledger line calculations are not particularly extensible, but
  // as currently there will only be a need for 2, there's no reason
  // yet to get exceptionally clever here.

  showPrimaryLedgerLine = (offset) => {
    const noteOffset = offset || this.props.offset;
    return (noteOffset > 4 || noteOffset < -1);
  }

  showSecondaryLedgerLine = (offset) => {
    const noteOffset = offset || this.props.offset;
    return (noteOffset > 5);
  }

  // Note: The ledger line is a box with a bottom border,
  // so there is some inherent offset from this.
  // Which is why the default is -20 not 0
  calcPrimaryLedgerLineOffset = (offset) => {
    const noteOffset = offset || this.props.offset;
    if (noteOffset > 4) {
      return 20*4;
    }
    if (noteOffset < -1) {
      return 20*(-2);
    }
    return -20;
  }

  calcSecondaryLedgerLineOffset = (offset) => {
    const noteOffset = offset || this.props.offset;
    if (noteOffset > 5) {
      return 20*(5);
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
              style={[styles.clefImage, {width: 60, height: 150}]}
              source={bassClef}
              resizeMode='contain'
            />
            <Image
              style={[styles.note, {marginTop: (20*(this.props.offset))}]}
              source={wholeNote}
              resizeMode='contain'
            />
            <Image
              style={[styles.note, styles.nextNote, {marginTop: (20*(this.props.nextNoteOffset))}]}
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
            {
              this.showSecondaryLedgerLine(this.props.nextNoteOffset) &&
              <View style={[styles.ledgerLine, styles.nextNoteLedgerLine, {marginTop: this.calcSecondaryLedgerLineOffset(this.props.nextNoteOffset)}]}/>
            }
            {
              this.showPrimaryLedgerLine(this.props.nextNoteOffset) &&
              <View style={[styles.ledgerLine, styles.nextNoteLedgerLine, {marginTop: this.calcPrimaryLedgerLineOffset(this.props.nextNoteOffset)}]}/>
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

export default StaffBass;

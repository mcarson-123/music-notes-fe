import React from 'react';

import { View, Image, Animated } from 'react-native';

import styles from './Staff.styles';

import trebleClef from '/assets/staff/treble-clef.png';
import bassClef from '/assets/staff/bass-clef.png';
import wholeNote from '/assets/staff/whole-note.png';

class Staff extends React.Component {
  // The ledger line calculations are not particularly extensible, but
  // as currently there will only be a need for 2, there's no reason
  // yet to get exceptionally clever here.

  state = {
    current: this.props.offset,
    next: this.props.nextNoteOffset,
    a1: new Animated.Value(1),
    a2: new Animated.Value(0),
    nextEntering: false,
  }

  componentDidUpdate(oldProps) {
    if (this.props.offset !== oldProps.offset) {
      Animated.timing(this.state.a1, {
        toValue: 0,
        duration: 600,
      }).start(() => {
        this.state.a2.setValue(0)
        this.setState({ nextEntering: true }, () => {
          Animated.timing(this.state.a2, {
            toValue: 0.5,
            duration: 600,
          }).start(() => {
            this.setState({ nextEntering: false })
          })
        })
        this.state.a1.setValue(1)
        this.setState({current: this.props.offset, next: this.props.nextNoteOffset})
      })
    }
  }

  showPrimaryLedgerLine = (offset) => {
    const noteOffset = offset || this.state.current;
    return (noteOffset > 4 || noteOffset < -1);
  }

  showSecondaryLedgerLine = (offset) => {
    const noteOffset = offset || this.state.current;
    if (this.props.isBass) {
      return (noteOffset > 5);
    }
    return (noteOffset < -2);
  }

  // Note: The ledger line is a box with a bottom border,
  // so there is some inherent offset from this.
  // Which is why the default is -20 not 0
  calcPrimaryLedgerLineOffset = (offset) => {
    const noteOffset = offset || this.state.current;
    if (noteOffset > 4) {
      return 20*4;
    }
    // Else is treble clef
    if (noteOffset < -1) {
      return 20*(-2);
    }
    return -20;
  }

  calcSecondaryLedgerLineOffset = (offset) => {
    const noteOffset = offset || this.state.current;

    if (this.props.isBass) {
      if (noteOffset > 5) {
        return 20*(5);
      }
      return -20;
    }
    // Else is treble clef
    if (noteOffset <= -2) {
      return 20*(-3);
    }
    return -20;
  }

  render() {
    // Note: 1 is removed from the note offset since the rotation of the note
    // then makes it not touch any staff lines above it. This lifts it up
    // slightly so it looks better.


    let translateCurrentNoteStyle = { opacity: this.state.a1 };
    const translate = this.state.a1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 114]
    })
    const opacity = this.state.a1.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.5]
    })
    let translateNextNoteStyle = {
      transform: [{ translateX: translate }],
      opacity: ( this.state.nextEntering ? this.state.a2 : opacity )
    };

    return(
      <View>
        <View style={styles.barLines}>
          <View style={styles.measure}>
            {
              this.props.isBass ?
              <Image
                style={[styles.bassClefImage, {width: 60, height: 150}]}
                source={bassClef}
                resizeMode='contain'
              /> :
              <Image
                style={[styles.trebleClefImage, {width: 60, height: 140}]}
                source={trebleClef}
                resizeMode='contain'
              />
            }
            <Animated.View style={ translateCurrentNoteStyle }>
              <Image
                style={[styles.note, {marginTop: (20*(this.state.current))}]}
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
            </Animated.View>
            <Animated.View style={translateNextNoteStyle}>
              <Image
                style={[styles.note, {marginTop: (20*(this.state.next))}]}
                source={wholeNote}
                resizeMode='contain'
              />
              {
                this.showSecondaryLedgerLine(this.state.next) &&
                <View style={[styles.ledgerLine, styles.nextNoteLedgerLine, {marginTop: this.calcSecondaryLedgerLineOffset(this.state.next)}]}/>
              }
              {
                this.showPrimaryLedgerLine(this.state.next) &&
                <View style={[styles.ledgerLine, styles.nextNoteLedgerLine, {marginTop: this.calcPrimaryLedgerLineOffset(this.state.next)}]}/>
              }
            </Animated.View>
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

export default Staff;

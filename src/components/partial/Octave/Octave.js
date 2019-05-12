import React from 'react';

import { View } from 'react-native';

import WhiteKey from '../../base/WhiteKey';
import BlackKey from '../../base/BlackKey';
import Key from '../../partial/Key';

import styles from './Octave.styles';

class Octave extends React.PureComponent {

  render() {
    return(
      <View style={styles.wrapper}>
        <Key note={this.props.note} noteValue={["C"]}><WhiteKey/></Key>
        <Key note={this.props.note} noteValue={["C+", "D-"]} zIndex><BlackKey/></Key>
        <Key note={this.props.note} noteValue={["D"]}><WhiteKey leftMargin/></Key>
        <Key note={this.props.note} noteValue={["D+", "E-"]} zIndex><BlackKey/></Key>
        <Key note={this.props.note} noteValue={["E"]}><WhiteKey leftMargin/></Key>
        <Key note={this.props.note} noteValue={["F"]}><WhiteKey/></Key>
        <Key note={this.props.note} noteValue={["F+", "G-"]} zIndex><BlackKey/></Key>
        <Key note={this.props.note} noteValue={["G"]}><WhiteKey leftMargin/></Key>
        <Key note={this.props.note} noteValue={["G+", "A-"]} zIndex><BlackKey/></Key>
        <Key note={this.props.note} noteValue={["A"]}><WhiteKey leftMargin/></Key>
        <Key note={this.props.note} noteValue={["A+", "B-"]} zIndex><BlackKey/></Key>
        <WhiteKey noteValue={["B"]} leftMargin/>
      </View>
    );
  }

}

export default Octave;

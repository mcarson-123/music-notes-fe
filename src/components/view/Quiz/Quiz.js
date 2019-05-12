import React from 'react';
import { Dimensions, View } from 'react-native';

import sample from 'lodash/sample';
import get from 'lodash/get';

import Octave from '../../partial/Octave';
import Staff from '../../partial/Staff';

const notes = ["F", "G", "A", "B", "C", "D", "E"];
const notesWithOffset = {
  "F": 3,
  "G": 2.5,
  "A": 2,
  "B": 1.5,
  "C": 1,
  "D": 0.5,
  "E": 0,
};

class Quiz extends React.Component {

  constructor(props) {
    super(props)

    const note = sample(notes)
    const offset = get(notesWithOffset, note);
    this.state = { note: note, offset: offset };
    console.log(this.state.note);
    console.log(this.state.offset);
  }

  render() {
    var {height, width} = Dimensions.get('window');
    console.log("height", height);
    console.log("width", width);

    return(
      <View>
        <Staff note={this.state.note} offset={this.state.offset}/>
        <Octave note={this.state.note}/>
      </View>
    );
  }

}

export default Quiz;

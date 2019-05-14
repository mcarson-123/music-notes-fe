import React from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import sample from 'lodash/sample';
import get from 'lodash/get';
import forEach from 'lodash/forEach';

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

  state = { loading: true }

  componentDidMount() {
    this.getStoreValues(["incorrectCount", "correctCount"]).then((values) => {

      const newNote = this.nextNote()
      const valuesHash = {
        loading: false,
        ...newNote,
      }

      forEach(values, (value) => {
        valuesHash[value[0]] = parseInt(value[1], 10) || 0
      });

      this.setState(valuesHash);
    });
  }

  getStoreValues = async (keys) => {

    let values
    try {
      values = await AsyncStorage.multiGet(keys)
      return values
    } catch(e) {
      // read error
    }
  }

  setStoreValues = async (valueArray) => {
    try {
      await AsyncStorage.multiSet(valueArray)
    } catch(e) {
      // save error
    }
  }

  nextNote = () => {
    const note = sample(notes)
    const offset = get(notesWithOffset, note);

    return { note, offset }
  }

  resetCounts = () => {
    this.setStoreValues([["incorrectCount", 0], ["correctCount", 0]])
    this.setState({incorrectCount: 0, correctCount: 0});
  }

  onNotePress = (key) => {
    const correct =  key.indexOf(this.state.note) >= 0;
    if (correct) {
      const newNote = this.nextNote()
      this.setState({
        correctCount: this.state.correctCount + 1,
        ...newNote,
      });
      this.setStoreValues([["correctCount", this.state.correctCount + 1]])
    } else {
      this.setState({incorrectCount: this.state.incorrectCount + 1});
      this.setStoreValues([["incorrectCount", this.state.incorrectCount + 1]])
    }
  }

  render() {
    // var {height, width} = Dimensions.get('window');
    // console.log("height", height);
    // console.log("width", width);

    if (this.state.loading) {
      return(
        <Text>Loading everything...</Text>
      )
    }

    return(
      <View>
        <View>
          <Text>{`Correct: ${this.state.correctCount}`}</Text>
          <Text>{`Incorrect: ${this.state.incorrectCount}`}</Text>
          <TouchableOpacity onPress={this.resetCounts}><Text>Reset</Text></TouchableOpacity>
        </View>
        <Staff note={this.state.note} offset={this.state.offset}/>
        <Octave note={this.state.note} onNotePress={this.onNotePress}/>
      </View>
    );
  }

}

export default Quiz;

import React from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import sample from 'lodash/sample';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import without from 'lodash/without';
import takeRight from 'lodash/takeRight';

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

  state = { loading: true, correctRunCount: 0}

  componentDidMount() {
    const intValues = ["correctCount", "incorrectCount"];
    const jsonValues = ["incorrectList"];
    this.getStoreValues(intValues.concat(jsonValues))
      .then((values) => {
        const valuesHash = { loading: false }

        forEach(values, (value) => {
          if (intValues.indexOf(value[0]) >= 0) {
            valuesHash[value[0]] = parseInt(value[1], 10) || 0
          } else if (jsonValues.indexOf(value[0]) >= 0) {
            valuesHash[value[0]] = JSON.parse(value[1]) || []
          }
        });

        const newNote = this.nextNote(valuesHash["incorrectList"])

        this.setState({ ...valuesHash, ...newNote });
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

    nextNote = (incorrectList) => {
    let notesToChooseFrom = notes

    // NOTE: May want to weigh incorrect notes even more heavily.
    // Given this method the user may not notice they are being given
    // their previously wrong notes more often.
    const incorrect = incorrectList || this.state.incorrectList || []
    // console.log("INCORRECT LIST", incorrect)
    notesToChooseFrom = notesToChooseFrom.concat(incorrect)

    // Don't show the user a note they have just seen
    // within this current session, if the app had been shut
    // down it's doesn't matter if they see the same note right
    // away upon opening it up
    const prevNote = this.state.note;
    notesToChooseFrom = without(notesToChooseFrom, prevNote)

    const note = sample(notesToChooseFrom)
    const offset = get(notesWithOffset, note);
    const startTime = Date.now()

    return { note, offset, startTime }
  }

  resetCounts = () => {
    this.setStoreValues([["incorrectCount", 0], ["correctCount", 0]])
    this.setState({incorrectCount: 0, correctCount: 0});
  }

  updateIncorrectList = () => {
    const currentList = this.state.incorrectList || []
    // Want to keep the list to the 20 most recent incorrect notes.
    // Duplicates are okay, since this helps weigh duplicate incorrect
    // answers more heavily.

    // add note to end of list
    currentList.push(this.state.note)

    // pare list down to 20 max
    const paredDownList = takeRight(currentList, 20)
    return paredDownList
  }

  onNotePress = (key) => {
    const correct =  key.indexOf(this.state.note) >= 0;

    if (correct) {
      // Only need to check the time if it was correct, since if it was
      // incorrect the note will be captured regardless
      const endTime = Date.now()
      const timeDeltaMs = endTime - this.state.startTime
      // Add note to incorrect list if it took the user longer than 3 seconds
      // to select it
      let incorrectList;
      if (timeDeltaMs >= 3000) {
        incorrectList = this.updateIncorrectList();
      }

      const newNote = this.nextNote()

      this.setState({
        correctCount: this.state.correctCount + 1,
        correctRunCount: this.state.correctRunCount + 1,
        incorrectList,
        ...newNote,
      });
      this.setStoreValues([["correctCount", this.state.correctCount + 1]])
    } else {
      const incorrectList = this.updateIncorrectList();
      const incorrectCount = this.state.incorrectCount + 1;
      this.setState(
        {
          incorrectCount: incorrectCount,
          correctRunCount: 0, // Reset correct run, sad for them :(
          incorrectList
        }
      );
      this.setStoreValues([["incorrectCount", incorrectCount], ["incorrectList", JSON.stringify(incorrectList)]])
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
          <Text>{`${this.state.correctRunCount} correct in a row!`}</Text>
          <TouchableOpacity onPress={this.resetCounts}><Text>Reset</Text></TouchableOpacity>
        </View>
        <Staff note={this.state.note} offset={this.state.offset}/>
        <Octave note={this.state.note} onNotePress={this.onNotePress}/>
      </View>
    );
  }

}

export default Quiz;

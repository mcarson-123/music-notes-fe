import React from 'react';
import { Dimensions, View, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import sample from 'lodash/sample';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import without from 'lodash/without';
import takeRight from 'lodash/takeRight';

import Octave from '../../partial/Octave';
import Staff from '../../partial/Staff';
import Text from '/components/base/Text';

import styles from './Quiz.styles';

import { notes, notesWithOffset } from '/config/constants.config';
import { spacings } from '/config/styles.config';

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
      // error
    }
  }

  resetStoreValues = async (keys) => {
    try {
      await AsyncStorage.multiRemove(keys)
    } catch(e) {
      // error
    }
  }

    nextNote = (incorrectList) => {
    let notesToChooseFrom = notes

    // NOTE: May want to weigh incorrect notes even more heavily.
    // Given this method the user may not notice they are being given
    // their previously wrong notes more often.
    const incorrect = incorrectList || this.state.incorrectList || []
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
    this.resetStoreValues(["incorrectCount", "correctCount", "incorrectList"]);
    this.setState({incorrectCount: 0, correctCount: 0, incorrectList: []});
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
    // Remove octave number from note to check against key
    const noteString = this.state.note.replace(/[0-9]/g, '');
    const correct =  key.indexOf(noteString) >= 0;

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
    if (this.state.loading) {
      return(
        <Text>Loading everything...</Text>
      )
    }

    return(
      <View style={styles.wrapper}>
        <View style={{ alignItems: 'center', padding: spacings.small}}>
          <Text textType='h1'>Learn your notes</Text>
        </View>
        <View style={styles.view}>
          <Staff
            note={this.state.note}
            offset={this.state.offset}
          />
          <View style={{height: spacings.xlarge}}/>
          <Octave
            note={this.state.note}
            onNotePress={this.onNotePress}
          />
        </View>
        <View style={styles.score}>
            <Text textType='body'>Score</Text>
            <Text textType='emphasized'>
              {`${this.state.correctCount}/${(this.state.correctCount + this.state.incorrectCount)}`}
            </Text>
            <TouchableOpacity onPress={this.resetCounts}>
              <Text textType='button'>Reset</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

}
// <View style={[styles.view, {width}]}>
export default Quiz;

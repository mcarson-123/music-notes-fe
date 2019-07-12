import React from 'react';
import { View, SafeAreaView, TouchableHighlight, StatusBar, Platform} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import BottomDrawer from 'rn-bottom-drawer';

import sample from 'lodash/sample';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import without from 'lodash/without';
import takeRight from 'lodash/takeRight';

import Octave from '../../partial/Octave';
import StaffTreble from '../../partial/StaffTreble';
import StaffBass from '../../partial/StaffBass';
import Drawer from '/components/partial/Drawer';
import Text from '/components/base/Text';

import styles from './Quiz.styles';

import { notes, trebleNotesWithOffset, bassNotesWithOffset } from '/config/constants.config';
import { spacings, colors1, colors2, themes } from '/config/styles.config';

class Quiz extends React.Component {
  state = { loading: true, correctRunCount: 0, colorScheme: 'colors1', clef: 'treble'}

  static navigationOptions = ({ navigation, state }) => {
    return {
      title: "Learn your notes",
      headerStyle: {
        backgroundColor: navigation.getParam('color')
      },
    };
  }

  componentDidMount() {
    // Load values from async store into state
    const intValues = ['correctCount', 'incorrectCount'];
    const stringValues = ['colorScheme', 'clef'];
    const jsonValues = ['incorrectList'];

    this.getStoreValues(intValues.concat(jsonValues).concat(stringValues))
      .then((values) => {
        const valuesHash = { loading: false }

        // TODO: Don't loop over items that have no value set
        forEach(values, (value) => {
          if (intValues.indexOf(value[0]) >= 0) {
            valuesHash[value[0]] = parseInt(value[1], 10) || 0
          } else if (stringValues.indexOf(value[0]) >= 0) {
            if (value[0] == 'colorScheme') {
              valuesHash[value[0]] = value[1] || this.state.colorScheme;
            } else if (value[0] == 'clef') {
              valuesHash[value[0]] = value[1] || this.state.clef;
            }
          } else if (jsonValues.indexOf(value[0]) >= 0) {
            valuesHash[value[0]] = JSON.parse(value[1]) || []
          }
        });

        const newNote = this.nextNote(valuesHash['incorrectList'])
        this.setState({ ...valuesHash, ...newNote });

        // Ensure color scheme loads into the header bar
        const colorScheme = this.state.colorScheme || 'colors1'
        const color = themes[colorScheme].backgroundDarker
        this.props.navigation.setParams({ color: color });

        StatusBar.setBarStyle('dark-content');
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(color);
        }
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
    // console.log("NOTE", note);
    // const notesWithOffset = this.state.clef == 'bass' ? bassNotesWithOffset : trebleNotesWithOffset
    // const offset = get(notesWithOffset, note);
    const startTime = Date.now()
    return { note, startTime }
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
    // console.log("KEY", key)
    const noteString = this.state.note.replace(/[0-9]/g, '');
    // console.log("NOTESTRING", noteString)
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
      this.setStoreValues([["correctCount", (this.state.correctCount + 1).toString()]])
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
      this.setStoreValues([["incorrectCount", incorrectCount.toString()], ["incorrectList", JSON.stringify(incorrectList)]])
    }
  }

  onColorSchemePress = (color) => {
    this.setState({colorScheme: color});
    this.setStoreValues([["colorScheme", color]]);

    const backgroundColor = themes[color].backgroundDarker
    this.props.navigation.setParams({ color: backgroundColor });

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor);
    }
  }

  onClefPress = (clef) => {
    const newNote = this.nextNote()

    this.setState({ clef, ...newNote });
    this.setStoreValues([["clef", clef]]);

    // need to reset incorrect notes list?
  }

  render() {
    if (this.state.loading) {
      return(
        <Text>Loading everything...</Text>
      )
    }

    const currentColorScheme = this.state.colorScheme || 'colors1';
    const backgroundColor = themes[currentColorScheme].background
    const highlightColor = themes[currentColorScheme].highlight
    const primaryColor = themes[currentColorScheme].primary
    const secondaryColor = themes[currentColorScheme].secondary

    const notesWithOffset = this.state.clef == 'bass' ? bassNotesWithOffset : trebleNotesWithOffset
    const offset = get(notesWithOffset, this.state.note);

    return(
      <View style={styles.wrapper}>
        <View style={styles.content}>

          <View>
            <View style={styles.staff}>
              { this.state.clef == 'bass' ?
                <StaffBass
                  note={this.state.note}
                  offset={offset}
                /> :
                <StaffTreble
                  note={this.state.note}
                  offset={offset}
                />
              }
            </View>
            <View style={styles.octave}>
              <Octave
                note={this.state.note}
                onNotePress={this.onNotePress}
                highlightColor={highlightColor}
              />
            </View>
          </View>
          <View style={styles.score}>
              <Text textType='h1' color={primaryColor}>
                Score
              </Text>
              <Text textType='emphasized' color={primaryColor}>
                {`${this.state.correctCount}/${(this.state.correctCount + this.state.incorrectCount)}`}
              </Text>
              <TouchableHighlight style={{borderRadius: 4}} underlayColor={highlightColor} onPress={this.resetCounts}>
                <View style={styles.reset}>
                  <Text textType='button' color={secondaryColor}>Reset</Text>
                </View>
              </TouchableHighlight>
          </View>
        </View>
        <View style={[styles.background, {backgroundColor: backgroundColor}]}/>
        <Drawer
          onColorPress={this.onColorSchemePress}
          colorScheme={currentColorScheme}
          onClefPress={this.onClefPress}
        />
      </View>
    );
  }

}

export default Quiz;

import React from 'react';
import { View, SafeAreaView, TouchableHighlight, StatusBar, Platform} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import BottomDrawer from 'rn-bottom-drawer';

import sample from 'lodash/sample';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import without from 'lodash/without';
import takeRight from 'lodash/takeRight';
import filter from 'lodash/filter';
import indexOf from 'lodash/indexOf';

import Octave from '../../partial/Octave';
import Staff from '../../partial/Staff';
import Drawer from '/components/partial/Drawer';
import Text from '/components/base/Text';
import Onboarding from '/components/partial/Onboarding';

import styles from './Quiz.styles';

import { notes, trebleNotesWithOffset, bassNotesWithOffset } from '/config/constants.config';
import { spacings, colors1, colors2, themes } from '/config/styles.config';

class Quiz extends React.Component {
  state = {
    loading: true,
    correctRunCount: 0,
    colorScheme: 'colors1',
    clef: 'treble',
    onboarded: false,
    onboardingStep: 1,
  }

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
    const boolValues = ['onboarded'];

    this.getStoreValues(intValues.concat(jsonValues).concat(stringValues).concat(boolValues))
      .then((values) => {
        const valuesHash = { loading: false }
        console.log("VALUES", values)

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
          } else if (boolValues.indexOf(value[0]) >= 0) {
            console.log("boolValues", value[0], value[1])
            valuesHash[value[0]] = value[1] || false
          }
        });

        // const nextNote = this.nextNote(valuesHash['incorrectList'])
        // const currentNote = this.currentNote(valuesHash['incorrectList'])
        const updateNotes = this.updateNotes(valuesHash['incorrectList'])
        this.setState({ ...valuesHash, ...updateNotes });

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

  updateNotes = (incorrectList) => {
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
    // const prevNote = this.state.note;
    const prevNextNote = this.state.nextNote
    notesToChooseFrom = without(notesToChooseFrom, prevNextNote)

    const nextNote = sample(notesToChooseFrom)

    const startTime = Date.now()
    let note;
    if (this.state.nextNote) {
      note = this.state.nextNote
    } else { // App is loading
      notesToChooseFrom = without(notesToChooseFrom, nextNote)
      note = sample(notesToChooseFrom)
    }

    return { nextNote, note, startTime }
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

      const updateNotes = this.updateNotes()

      this.setState({
        correctCount: this.state.correctCount + 1,
        correctRunCount: this.state.correctRunCount + 1,
        incorrectNoteOffset: null,
        incorrectNote: null,
        incorrectList,
        ...updateNotes,
      });
      this.setStoreValues([["correctCount", (this.state.correctCount + 1).toString()]])
    } else {
      const incorrectList = this.updateIncorrectList();
      const incorrectCount = this.state.incorrectCount + 1;
      const notesWithOffset = this.state.clef == 'bass' ? bassNotesWithOffset : trebleNotesWithOffset

      const notesForKey = filter(notes, (note) => { return note[0] === key[0] })
      let distance = 9
      let closestIncorrectNote = ""
      forEach(notesForKey, (note) => {
        noteDistance = Math.abs(Math.abs(indexOf(notes, this.state.note)) - Math.abs(indexOf(notes, note)))
        if (noteDistance < distance) {
          distance = noteDistance
          closestIncorrectNote = note;
        }
      })

      const offset = get(notesWithOffset, closestIncorrectNote);
      this.setState(
        {
          incorrectCount: incorrectCount,
          correctRunCount: 0, // Reset correct run, sad for them :(
          incorrectNoteOffset: offset,
          incorrectNote: closestIncorrectNote,
          incorrectList
        }
      );
      this.setStoreValues([["incorrectCount", incorrectCount.toString()], ["incorrectList", JSON.stringify(incorrectList)]])
    }
  }

  onColorSchemePress = (color) => {
    this.setState({
      colorScheme: color,
      incorrectNoteOffset: null, // reset so it doesn't flash to the user
      incorrectNote: null,
      });
    this.setStoreValues([["colorScheme", color]]);

    const backgroundColor = themes[color].backgroundDarker
    this.props.navigation.setParams({ color: backgroundColor });

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor);
    }
  }

  onClefPress = (clef) => {
    const updateNotes = this.updateNotes()

    this.setState({
      clef,
      incorrectNoteOffset: null, // reset so it doesn't flash to the user
      incorrectNote: null,
      ...updateNotes
    });
    this.setStoreValues([["clef", clef]]);

    // need to reset incorrect notes list?
  }

  finishedOnboarding = () => {
    this.setState({ onboarded: true, onboardingStep: 1 })
    this.setStoreValues([["onboarded", true]]);
  }

  updateOnboardingStep = () => {
    this.setState({ onboardingStep: this.state.onboardingStep + 1 })
  }

  showTour = () => {
    this.setState({ onboarded: false })
    this.setStoreValues([["onboarded", false]]);
  }

  render() {
    if (this.state.loading) {
      return(
        <Text>Loading...</Text>
      )
    }

    const currentColorScheme = this.state.colorScheme || 'colors1';
    const backgroundColor = themes[currentColorScheme].background
    const backgroundDarkerColor = themes[currentColorScheme].backgroundDarker
    const highlightColor = themes[currentColorScheme].highlight
    const primaryColor = themes[currentColorScheme].primary
    const secondaryColor = themes[currentColorScheme].secondary

    const notesWithOffset = this.state.clef == 'bass' ? bassNotesWithOffset : trebleNotesWithOffset
    const offset = get(notesWithOffset, this.state.note);
    const nextNoteoffset = get(notesWithOffset, this.state.nextNote);


    // Styles
    const staffStyles = [styles.staff];
    if (!this.state.onboarded && indexOf([2, 4, 5], this.state.onboardingStep) >= 0) {
      staffStyles.push(styles.onboardingZIndex);
    }

    const scoreStyles = [styles.score];
    if (!this.state.onboarded  && indexOf([6], this.state.onboardingStep) >= 0) {
      scoreStyles.push(styles.onboardingZIndex);
    }

    const octaveStyles = [styles.octave];
    if (!this.state.onboarded  && indexOf([3], this.state.onboardingStep) >= 0) {
      octaveStyles.push(styles.onboardingZIndex);
    }

    let drawerRaiseZIndex = false;
    if (!this.state.onboarded  && indexOf([7], this.state.onboardingStep) >= 0) {
      drawerRaiseZIndex = true;
    }

    return(
      <View style={styles.wrapper}>
        <View style={[styles.background, {backgroundColor: backgroundColor}]}/>
        {
          !this.state.onboarded &&
          <Onboarding
            highlightColor={highlightColor}
            backgroundColor={backgroundDarkerColor}
            finishedOnboarding={this.finishedOnboarding}
            updateOnboardingStep={this.updateOnboardingStep}
            currentOnboardingStep={this.state.onboardingStep}
          />
        }
        <View style={styles.content}>
          <View>
            {!this.state.onboarded && <View style={styles.overlay} />}

            <View style={scoreStyles}>
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
            <View style={staffStyles}>
              <Staff
                note={this.state.note}
                offset={offset}
                nextNoteOffset={nextNoteoffset}
                incorrectNote={this.state.incorrectNote}
                incorrectNoteOffset={this.state.incorrectNoteOffset}
                isBass={this.state.clef == 'bass'}
              />
            </View>
            <View style={octaveStyles}>
              <Octave
                note={this.state.note}
                onNotePress={this.onNotePress}
                highlightColor={highlightColor}
              />
            </View>
          </View>
        </View>
          {!this.state.onboarded && <View style={styles.overlayDrawer} />}
          <Drawer
            drawerRaiseZIndex={drawerRaiseZIndex}
            onColorPress={this.onColorSchemePress}
            colorScheme={currentColorScheme}
            onClefPress={this.onClefPress}
            showTour={this.showTour}
          />
      </View>
    );
  }

}

export default Quiz;

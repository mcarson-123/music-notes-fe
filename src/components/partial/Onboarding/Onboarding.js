import React from 'react';

import { TouchableOpacity, View } from 'react-native';

import size from 'lodash/size';

import InfoPanel from '/components/base/InfoPanel';

// import styles from './Onboarding.styles';

class Onboarding extends React.Component {
  state = {
    currentStep: 1,
  }

  steps = () => (
    {
      1: {
        text: "Welcome! The goal of this game is to better learn your notes on the staff. Let's get started",
        clickableText: "next",
        xOffset: 0,
        yOffset: 50,
      },
      2: {
        text: "You will be shown a note on the staff, and will decide which note this is.",
        clickableText: "next",
        xOffset: 0,
        yOffset: 330,
      },
      3: {
        text: "You will need to press the piano key that matches the note shown.",
        clickableText: "next",
        xOffset: 0,
        yOffset: 230,
      },
      4: {
        text: "This greyed out note is the note you will need to play after you get the current one correct.",
        clickableText: "next",
        xOffset: 0,
        yOffset: 330,
      },
      5: {
        text: "If you get it wrong, you will see the note you pressed displayed in red. If you get it right, you will move on to the next note.",
        clickableText: "next",
        xOffset: 0,
        yOffset: 330,
      },
      6: {
        text: "You can see how you are doing! If you want a fresh slate, click 'refresh' and you can start tracking your progress again.",
        clickableText: "next",
        xOffset: 0,
        yOffset: 170,
      },
      7: {
        text: "You can use the settings to change the clef back and forth from treble to bass, try out different colour schemes, and take this tour again.",
        clickableText: "done",
        xOffset: 0,
        yOffset: 450,
      }
    }
  )

  stepDetails = (stepNumber) => {
    return this.steps()[stepNumber]
  }

  nextStep = () => {
    const currentStep = this.state.currentStep
    console.log("size", size(this.steps()));
    if (currentStep === size(this.steps())) {
      this.props.finishedOnboarding()
    } else {
      this.setState({ currentStep: currentStep + 1 })
    }
  }

  render() {
    // console.log("STATE", this.state.currentStep, this.state.show)
    const { yOffset, xOffset, text, clickableText } = this.stepDetails(this.state.currentStep)
    // console.log(yOffset, xOffset, text);
    return(
      <InfoPanel
        xOffset={xOffset}
        yOffset={yOffset}
        text={text}
        clickableText={clickableText}
        onPress={this.nextStep}
        highlightColor={this.props.highlightColor}
        backgroundColor={this.props.backgroundColor}
      />
    );
  }
}

export default Onboarding;

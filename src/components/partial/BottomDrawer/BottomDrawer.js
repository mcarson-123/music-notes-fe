import React from 'react';

import { TouchableWithoutFeedback, Animated, Platform, Dimensions } from 'react-native';

import styles from './BottomDrawer.styles';

class BottomDrawer extends React.Component {
  bottomPosition = () => {
    const isIos = Platform.OS === 'ios';
    const isIphoneX = isIos && Dimensions.get('window').height === 812;
    const bottomPosition = isIphoneX ? -310 : -320
    return bottomPosition;
  }

  state = { isOpen: false, bottomPosition: this.bottomPosition() }

  constructor(props) {
    super(props)

    this.yTranslate = new Animated.Value(0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen == this.state.isOpen) { return }

    if (this.state.isOpen) {
      // animate the showing of the modal
      this.yTranslate.setValue(0); // reset the animated value
      Animated.timing(this.yTranslate, {
        toValue: 1,
        duration: 300,
      }).start();
    } else {
      // animate the hiding of the modal
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 300,
      }).start();
    }
  }

  onPress = () => {
    if (this.state.isOpen) {
      this.setState({isOpen: false, bottomPosition: this.bottomPosition()})
    } else {
      this.setState({isOpen: true, bottomPosition: 0})
    }
  }

  render() {
    const { isOpen, backgroundColor, children } = this.props;

    let negativeHeight = this.bottomPosition();
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    });

    let translateStyle = { transform: [{ translateY: modalMoveY }] };

    return(
      <Animated.View style={ [styles.background, translateStyle, {backgroundColor: backgroundColor, bottom: this.bottomPosition()}] }>
      <TouchableWithoutFeedback onPress={this.onPress}>
        { children }
      </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

export default BottomDrawer;

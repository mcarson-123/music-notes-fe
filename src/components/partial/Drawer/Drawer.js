import React from 'react';

import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  Animated
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import DrawerContents from '/components/partial/DrawerContents';

import { colors1, colors2, colors3, themes } from '/config/styles.config';

import styles from './Drawer.styles';

class Drawer extends React.PureComponent {

  bottomPosition = () => {
    return -340;
  }

  state = {
    close: false,
    isOpen: false,
    bottomPosition: this.bottomPosition(),
   }

  constructor(props) {
    super(props)

    this.yTranslate = new Animated.Value(0); // move to state
  }

  showTour = () => {
    console.log("show tour & close")
    // this.setState({ close: true })
    this.setState({isOpen: false, bottomPosition: this.bottomPosition()})
    this.props.showTour()
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
    const backgroundColor = themes[this.props.colorScheme].backgroundDarker
    const textColor = themes[this.props.colorScheme].primary

    let negativeHeight = this.bottomPosition();
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    });

    let translateStyle = { transform: [{ translateY: modalMoveY }] };
    let zIndexStyle = this.props.drawerRaiseZIndex ? {zIndex: 11} : {};

    return(
      <Animated.View style={ [styles.background, translateStyle, zIndexStyle, {bottom: this.bottomPosition()}] }>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={[styles.tab, {backgroundColor: backgroundColor}]}>
            <View style={styles.heading}>
              <Icon name="settings" size={30} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.onPress}>
          <View style={styles.content}>
            <DrawerContents
              showTour={this.showTour}
              onColorPress={this.props.onColorPress}
              onClefPress={this.props.onClefPress}
              backgroundColor={backgroundColor}
              textColor={textColor}
            />
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }

}

export default Drawer;

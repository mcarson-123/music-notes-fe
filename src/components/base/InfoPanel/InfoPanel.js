import React from 'react';

import { View, TouchableWithoutFeedback } from 'react-native';

import Text from '/components/base/Text';

import styles from './InfoPanel.styles';

class InfoPanel extends React.Component {

  render() {

    const position = {
      top: this.props.yOffset,
      right: this.props.xOffset
    }

    return(
      <View style={ [styles.container, position, { backgroundColor: this.props.backgroundColor }] }>
        <TouchableWithoutFeedback onPress={this.props.onPress} underlayColor={this.props.backgroundColor}>
          <View>
            <Text textType='bodySmall'>{ this.props.text }</Text>
            <View style={ styles.button }>
                <Text textType='buttonSmall'>{ this.props.clickableText }</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default InfoPanel;

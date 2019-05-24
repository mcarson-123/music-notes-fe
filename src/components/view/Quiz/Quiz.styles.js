import { StyleSheet } from 'react-native';
import { spacings, screenWidth } from '/config/styles.config';

export default StyleSheet.create({
  wrapper: {
    width: screenWidth,
  },
  view: {
    width: '100%',
    padding: spacings.medium,
  },
})

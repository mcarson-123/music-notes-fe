import { StyleSheet } from 'react-native';
import { spacings, screenWidth, screenHeight } from '/config/styles.config';

export default StyleSheet.create({
  wrapper: {
    width: screenWidth,
    height: screenHeight,
    marginTop: (.05 * screenHeight),
    paddingBottom: spacings.medium,
    justifyContent: 'space-between',
    flex: 1,
  },
  heading: {
    alignItems: 'center',
  },
  staff: {
    width: '100%',
    paddingRight: spacings.medium,
    paddingLeft: spacings.medium,
    marginTop: spacings.medium,
    marginBottom: (.10 * screenHeight),
  },
  octave: {
    width: '100%',
    alignItems: 'center',
    paddingRight: spacings.medium,
    paddingLeft: spacings.medium,
  },
  score: {
    alignItems: 'center',
    marginBottom: (.03 * screenHeight),
  }
})

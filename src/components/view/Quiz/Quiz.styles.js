import { StyleSheet } from 'react-native';
import { spacings, colors, screenWidth, screenHeight } from '/config/styles.config';

export default StyleSheet.create({
  background: {
    // backgroundColor: colors.fourLight,
    position: 'absolute',
    top: -60,
    bottom: -60,
    right: 0,
    left: 0,
    zIndex: -1000,
  },
  wrapper: {
    width: screenWidth,
    height: screenHeight,
    flex: 1,
  },
  content: {
    width: screenWidth,
    height: screenHeight,
    marginTop: (.05 * screenHeight),
    // paddingBottom: spacings.medium,
    paddingBottom: (screenHeight < 700 ? spacings.medium : (.15 * screenHeight)),
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
  },
})

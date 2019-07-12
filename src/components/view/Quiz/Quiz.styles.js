import { StyleSheet } from 'react-native';
import { spacings, screenWidth, screenHeight } from '/config/styles.config';

export default StyleSheet.create({
  background: {
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
  score: {
    alignItems: 'center',
    marginBottom: (.00000005 * screenHeight * screenHeight * screenHeight),
  },
  staff: {
    width: '100%',
    paddingRight: spacings.medium,
    paddingLeft: spacings.medium,
    marginTop: spacings.medium,
    marginBottom: (.0002 * screenHeight * screenHeight),
  },
  octave: {
    width: '100%',
    alignItems: 'center',
    paddingRight: spacings.medium,
    paddingLeft: spacings.medium,
  },
  reset: {
    height: 26,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

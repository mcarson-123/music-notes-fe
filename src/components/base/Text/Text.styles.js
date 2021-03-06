import {StyleSheet} from 'react-native';

// import { themes } from '/config/styles.config';

// const currentColorScheme = this.state.colorScheme || 'colors1';

export default StyleSheet.create({
  emphasized: {
    // color: themes[currentColorScheme].primary,
    fontSize: 42,
    fontWeight: 'bold',
  },
  h1: {
    // color: themes[currentColorScheme].primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    // color: themes[currentColorScheme].secondary,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 0.6,
  },
  buttonSmall: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 0.6,
  },
  body: {
    fontSize: 24,
  },
  bodySmall: {
    fontSize: 18,
  }
})

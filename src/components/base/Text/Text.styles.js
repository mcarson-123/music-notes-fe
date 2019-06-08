import {StyleSheet} from 'react-native';

import { colors } from '/config/styles.config';

export default StyleSheet.create({
  emphasized: {
    color: colors.oneDark,
    fontSize: 42,
    fontWeight: 'bold',
  },
  h1: {
    color: colors.oneDark,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    color: colors.threeDark,
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 24,
  }
})

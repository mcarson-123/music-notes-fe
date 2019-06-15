import {StyleSheet} from 'react-native';

import { colors, spacings } from '/config/styles.config';

export default StyleSheet.create({
  drawer: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    paddingTop: spacings.xsmall,
    paddingBottom: spacings.medium,
  },
  break: {
    height: 1,
    width: '80%',
    borderColor: colors.mediumGrey,
    borderTopWidth: 1,
  },
  section: {
    padding: spacings.small,
  },
  sectionHeading: {
    paddingBottom: spacings.small,
  },
  colorSwatches: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colorSwatch: {
    height: 40,
    width: 40,
    borderRadius: 4,
  }
})

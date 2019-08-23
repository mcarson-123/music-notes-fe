import {StyleSheet} from 'react-native';

import { colors, spacings } from '/config/styles.config';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 340,
    width: '100%',
  },
  drawer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 10,
  },
  break: {
    height: 1,
    width: '80%',
    borderColor: colors.mediumGrey,
    borderTopWidth: 1,
  },
  section: {
    padding: spacings.small,
    width: '80%',
  },
  sectionHeading: {
    paddingBottom: spacings.small,
    alignSelf: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: spacings.small,
    paddingLeft: spacings.small,
  },
  colorSwatch: {
    height: 42,
    width: 42,
    borderRadius: 4,
    marginRight: spacings.xsmall,
    marginLeft: spacings.xsmall,
  },
  clefOption: {
    height: 42,
    width: 42,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    marginRight: spacings.xsmall,
    marginLeft: spacings.xsmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trebleClefImage: {
    height: 38,
    width: 38,
  },
  bassClefImage: {
    height: 30,
    width: 30,
  }
})

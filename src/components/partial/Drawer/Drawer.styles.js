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
    // backgroundColor: 'blue',
    width: '60%',
    // marginRight: spacings.medium,
    // marginLeft: spacings.medium,
  },
  sectionHeading: {
    paddingBottom: spacings.small,
    alignSelf: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    justifyContent: 'center',
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
  },
  clefImage: {
    height: 30,
    width: 30,
  }
})

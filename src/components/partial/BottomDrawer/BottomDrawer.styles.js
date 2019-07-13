import { StyleSheet } from 'react-native';

import { colors } from '/config/styles.config';

export default StyleSheet.create({
  background: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    // height: 370,
    width: '100%',
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,
    // shadowColor: colors.mediumGrey,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 3,
    // elevation: 8, // Used for Android devices
  },
  tab: {
    width: 80,
    height: 50,
    alignSelf: 'flex-end',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: colors.mediumGrey,
    // shadowOffset: { width: 0, height: },
    // shadowOpacity: 0.8,
    // shadowRadius: 3,
    // elevation: 8, // Used for Android devices
  },
});

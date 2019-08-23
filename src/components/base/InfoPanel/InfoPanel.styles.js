import { StyleSheet } from 'react-native';

import { spacings } from '/config/styles.config';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    // width: 200,
    // height: 100,
    margin: spacings.small,
    padding: spacings.small,
    // backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    zIndex: 12,
  },
  button: {
    borderRadius: 4,
    marginTop: spacings.xsmall,
    alignSelf: 'flex-end',
    padding: spacings.xsmall,
    width: 60,
    height: 40,
  }
})

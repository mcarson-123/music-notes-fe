import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  barLines: {
    width: '100%',
  },
  measure: {
  },
  note: {
    position: 'absolute',
    marginLeft: 100,
    height: 20,
    width: 20,
    zIndex: 100,
    backgroundColor: 'black',
    borderRadius: 10,
    transform: [
      {scaleX: 1.3},
      {rotateX: '160deg'},
      {rotateY: '160deg'},
    ],
  },
  singleBarLine: {
    height: 20,
    borderColor: 'black',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  lastBarLine: {
    borderBottomWidth: 1,
  }
})

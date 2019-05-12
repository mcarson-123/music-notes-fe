import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  barLines: {
    margin: 50,
  },
  measure: {
  },
  note: {
    position: 'absolute',
    marginLeft: 100,
    // marginTop: 20, // 20*offset
    height: 20,
    width: 20,
    zIndex: 100,
    backgroundColor: 'black',
    // backgroundColor: 'white',
    // borderColor: 'black',
    // borderWidth: 4,
    borderRadius: 10,
    transform: [
      {scaleX: 1.3},
      {rotateX: '160deg'},
      {rotateY: '160deg'},
    ],
  },
  singleBarLine: {
    width: 250,
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

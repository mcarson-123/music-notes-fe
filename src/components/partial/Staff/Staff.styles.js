import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  barLines: {
    width: '100%',
  },
  measure: {
  },
  bassClefImage: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: -42,
    zIndex: 1,
  },
  trebleClefImage: {
    position: 'absolute',
    marginLeft: 10,
    marginTop: -27,
    zIndex: 1,
  },
  note: {
    position: 'absolute',
    marginLeft: 96,
    height: 20,
    width: 40,
    zIndex: 1,
  },
  nextNote: {
    marginLeft: 210,
    opacity: 0.5,
  },
  ledgerLine: {
    position: 'absolute',
    height: 20,
    width: 50,
    marginLeft: 90,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  nextNoteLedgerLine: {
    marginLeft: 90,
    opacity: 0.4,
  },
  singleBarLine: {
    height: 20,
    borderColor: 'black',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    // backgroundColor: 'white',
  },
  lastBarLine: {
    borderBottomWidth: 1,
  }
})

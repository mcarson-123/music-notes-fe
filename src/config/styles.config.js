import { Dimensions } from 'react-native';

export const spacings = {
  xsmall: 10,
  small: 20,
  medium: 40,
  large: 60,
  xlarge: 80,
};

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const colors = {
  lightGrey: '#D3D3D3',
  mediumGrey: '#C0C0C0',
  darkGrey: '#A9A9A9'
}

export const colors1 = {
  name: 'colors1',
  primary: '#000000',
  secondary: '#666666',
  background: '#FFFFFF',
  backgroundDarker: '#F2F2F2',
}

export const colors2 = {
  name: 'colors2',
  // one: '#827081',
  // oneDark: '#5B4B5A',
  // two: '#AEA3B0',
  // three: '#E3D0D8',
  // threeDark: '#99687C',
  // four: '#E7E6F7',
  // fourLight: '#F5F4FF',
  // five: '#C6D2ED',
  // fiveDark: '#1A253F',
  primary: '#5B4B5A',
  secondary: '#99687C',
  background: '#F7F7FF',
  // backgroundDarker: '#E2E1F2',
  backgroundDarker: '#E4E3F4',
}

export const colors3 = {
  name: 'colors3',
  primary: '#4B665A',
  secondary: '#89B5B3',
  // background: '#EDFFFC',
  background: '#EFFFFC',
  // backgroundDarker: '#D2EFEB',
  backgroundDarker: '#DCF4F1',
}

export const themes = {
  colors1, colors2, colors3
}

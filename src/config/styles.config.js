import { Dimensions } from 'react-native';

export const spacings = {
  small: 20,
  medium: 40,
  large: 60,
  xlarge: 80,
};

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const colors1 = {
  name: 'colors1',
  one: '#827081',
  oneDark: '#5B4B5A',
  two: '#AEA3B0',
  three: '#E3D0D8',
  threeDark: '#99687C',
  four: '#E7E6F7',
  fourLight: '#F5F4FF',
  five: '#C6D2ED',
  fiveDark: '#1A253F',
  primary: '#5B4B5A',
  secondary: '#99687C',
  background: '#F5F4FF',
}

export const colors2 = {
  name: 'colors2',
  primary: '#4B665A',
  secondary: '#89B5B3',
  background: '#E8FFFC',
}

export const themes = {
  colors1, colors2
}

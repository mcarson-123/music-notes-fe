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
  darkGrey: '#A9A9A9',
  error: '#D6360E'
}

export const colors1 = {
  name: 'colors1',
  primary: '#000000',
  secondary: '#666666',
  background: '#FFFFFF',
  backgroundDarker: '#F2F2F2',
  highlight: '#E2E2E2',
}

export const colors2 = {
  name: 'colors2',
  primary: '#5B4B5A',
  secondary: '#99687C',
  background: '#F7F7FF',
  backgroundDarker: '#E4E3F4',
  highlight: '#E0DEEF',
}

export const colors3 = {
  name: 'colors3',
  primary: '#4B665A',
  secondary: '#89B5B3',
  background: '#EFFFFC',
  backgroundDarker: '#DCF4F1',
  highlight: '#CCE2DF',
}

export const themes = {
  colors1, colors2, colors3
}

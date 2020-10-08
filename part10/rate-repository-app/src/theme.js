import { Platform, StyleSheet } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBar: '#24292e',
    white: '#ffffff',
    main: '#e1e4e8',
    gray: 'lightgray',
    red: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading2: 16,
    subheading: 18,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export const globalStyles = StyleSheet.create({
  form: {
    padding: 10,
  },
  input: {
    backgroundColor: theme.colors.white,
    marginVertical: 5,
    padding: 15,
    paddingHorizontal: 15,
    borderColor: theme.colors.gray,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#00000000',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default theme;

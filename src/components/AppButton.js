import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, ActivityIndicator
} from 'react-native';
import Colors from '../constants/Colors';

const AppButton = ({
  buttonStyle, textStyle, title, onSubmit, isLoading = false, isDisabled = false
}) => (
  <TouchableOpacity
    style={[styles.buttonStyle, styles[buttonStyle]]}
    onPress={onSubmit}
    disabled={isDisabled}
  >
    {isLoading
      ? <ActivityIndicator size="large" color="#00ff00" />
      : <Text style={[styles.textStyle, styles[textStyle]]}>{title}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: Colors.green
  },
  secondaryButton: {
    backgroundColor: Colors.grey200,
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '700'
  },
  primaryText: {
    color: 'white'
  },
  secondaryText: {
    color: 'black',
  }
});

export default AppButton;

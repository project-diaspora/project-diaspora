import React from 'react';
import { StyleSheet, Text } from 'react-native';

const InfoAlert = ({ message, type }) => <Text style={[styles[type], styles.alert]}>{message}</Text>;

const styles = StyleSheet.create({
  alert: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  error: {
    borderColor: '#f5c6cb',
    backgroundColor: '#f8d7da',
    color: '#721c24'
  },
  info: {
    borderColor: '#bee5eb',
    backgroundColor: '#d1ecf1',
    color: '#0c5460'
  }
});


export default InfoAlert;

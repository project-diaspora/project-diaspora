import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default function HeaderText(props) {
  return (
    <Text style={styles.headerText}>{props.title}</Text>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    margin: 20,
  }
});
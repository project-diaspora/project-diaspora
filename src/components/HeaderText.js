import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default function HeaderText({ title }) {
  return (
    <Text style={styles.headerText}>{ title }</Text>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    margin: 20,
  }
});

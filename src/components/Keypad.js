import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const Keypad = ({ onAddInt, onAddDecimal, onBackspace }) => (
  <View style={styles.keyboard}>
    <View style={styles.keyboardRow}>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('1')}
      >
        <Text style={styles.keyboardText}>1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('2')}
      >
        <Text style={styles.keyboardText}>2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('3')}
      >
        <Text style={styles.keyboardText}>3</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.keyboardRow}>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('4')}
      >
        <Text style={styles.keyboardText}>4</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('5')}
      >
        <Text style={styles.keyboardText}>5</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('6')}
      >
        <Text style={styles.keyboardText}>6</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.keyboardRow}>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('7')}
      >
        <Text style={styles.keyboardText}>7</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('8')}
      >
        <Text style={styles.keyboardText}>8</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('9')}
      >
        <Text style={styles.keyboardText}>9</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.keyboardRow}>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddDecimal()}
      >
        <Text style={styles.keyboardText}>.</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => onAddInt('0')}
      >
        <Text style={styles.keyboardText}>0</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.keyboardButton} onPress={() => onBackspace()}><Ionicons
        style={{ textAlign: 'center' }}
        name="ios-backspace"
        size={30}
        color={Colors.green}
      />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  keyboard: {
    marginBottom: 100,
  },
  keyboardButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    height: 80,
  },
  keyboardText: {
    textAlign: 'center',
    color: Colors.green,
    fontSize: 28,
    fontWeight: '600',
    paddingVertical: 'auto',
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
});

export default Keypad;

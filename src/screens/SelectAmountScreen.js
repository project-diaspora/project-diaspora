import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import AppButton from '../components/AppButton';
import Keypad from '../components/Keypad';

const SelectAmountScreen = ({ navigation }) => {
  const [integers, setIntegers] = useState('0');
  const [decimals, setDecimals] = useState(null);


  const add = (number) => {
    if (decimals) {
      if (decimals && decimals.length < 3) {
        setDecimals(decimals.concat(number));
      } else if (decimals && decimals.length === 3) {
        setDecimals(decimals);
      } else {
        setDecimals(number);
      }
    } else if (integers === '0') {
      setIntegers(number);
    } else {
      setIntegers(integers.concat(number));
    }
  };

  const addDecimal = () => {
    setDecimals('.');
  };

  const backspace = () => {
    if (decimals) {
      if (decimals.length === 3) {
        setDecimals(decimals.slice(0, 2));
      } else if (decimals.length === 2) {
        setDecimals(decimals.slice(0, 1));
      } else {
        setDecimals(null);
      }
    } else if (integers !== '0') {
      if (integers.length === 1) {
        setIntegers('0');
      } else {
        setIntegers(integers.slice(0, integers.length - 1));
      }
    }
  };

  const next = () => {
    let amountInUsd = integers;
    if (decimals && decimals !== '.') {
      amountInUsd = amountInUsd.concat(decimals);
    }
    navigation.navigate('SelectContact', { amount: amountInUsd });
  };

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>
          $
          {integers}
          {decimals}
        </Text>
        <TouchableOpacity style={styles.maxButton}>
          <Text style={styles.maxButtonText}>Max</Text>
        </TouchableOpacity>
      </View>
      <Keypad
        onAddInt={add}
        onAddDecimal={addDecimal}
        onBackspace={backspace}
      />
      <View style={styles.container}>
        <View style={styles.actionContainer}>
          <AppButton
            buttonStyle="primaryButton"
            textStyle="primaryText"
            title="Next"
            onSubmit={() => {
              next();
            }}
          />
        </View>
      </View>
    </View>
  );
};


SelectAmountScreen.navigationOptions = ({ navigation }) => ({
  title: 'Select Amount',
  headerRight: (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => {
        navigation.popToTop();
      }}
    >
      <Ionicons name="ios-close" size={40} color="black" />
    </TouchableOpacity>
  ),
  headerBackTitle: null,
  headerLeft: null,
  headerRightContainerStyle: {
    paddingRight: 20
  },
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
  }
});


const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: -10,
  },
  amountText: {
    fontSize: 40,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  amountContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 20,
  },
  maxButtonText: {
    color: Colors.green,
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '600',
  },
  maxButton: {
    padding: 10,
  },
  backspace: {
    height: 30,
    width: 30,
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 150
  },
  container: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 50
  }
});

export default SelectAmountScreen;

import React, { useState, useContext } from 'react';
import {
  Alert, View, Text, StyleSheet, Linking, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Context as AuthContext } from '../context/AuthContext';

const AddCardScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);

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
    Alert.alert(
      'Sending you to Wyre',
      'We\'re about to send you to Wyre to process your transactions. All details on the following page have been pre-filled and should not be changed.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => Linking.openURL(`https://pay.sendwyre.com/purchase?destCurrency=DAI&sourceAmount=${amountInUsd}&dest=ethereum:${state.walletAddress}&paymentMethod=apple-pay`) },
      ],
      { cancelable: false }
    );
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

      <View style={styles.keyboard}>
        <View style={styles.keyboardRow}>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('1')}>
            <Text
              style={styles.keyboardText}
            >1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('2')}>
            <Text
              style={styles.keyboardText}
            >2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('3')}>
            <Text
              style={styles.keyboardText}
            >3
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('4')}>
            <Text
              style={styles.keyboardText}
            >4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('5')}>
            <Text
              style={styles.keyboardText}
            >5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('6')}>
            <Text
              style={styles.keyboardText}
            >6
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('7')}>
            <Text
              style={styles.keyboardText}
            >7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('8')}>
            <Text
              style={styles.keyboardText}
            >8
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('9')}>
            <Text
              style={styles.keyboardText}
            >9
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRow}>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => addDecimal()}>
            <Text
              style={styles.keyboardText}
            >.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => add('0')}>
            <Text
              style={styles.keyboardText}
            >0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keyboardButton} onPress={() => backspace()}><Ionicons
            style={{ textAlign: 'center' }}
            name="ios-backspace"
            size={30}
            color={Colors.green}
          />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={() => next()}>
          <Text
            style={styles.nextButtonText}
          >Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


AddCardScreen.navigationOptions = () => ({
  title: 'Select Amount',
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
  },
});

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
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
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  keyboard: {
    // flex: 1,
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
  backspace: {
    height: 30,
    width: 30,
  },
  nextButton: {
    backgroundColor: Colors.green,
    paddingVertical: 12,
    paddingHorizontal: 100,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '600',
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 50,
  },
});

export default AddCardScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Crypto from '../components/utils/Crypto'

const ConfirmTransactionScreen = ({ navigation }) => {

  const sendMothafucka = async (amount, toAddress) => {
    const tx = await Crypto.signDAITransaction(amount.toString(), toAddress)
    console.log(tx.hash)
  }

  return (
    <View style={styles.modalContainer}>
      <View>
        <Text>Amount: {navigation.getParam('amount')}</Text>
        <Text>toAddress: {navigation.getParam('toAddress').split(':')[1]}</Text>
      </View>

      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={() => sendMothafucka(navigation.getParam('amount'), navigation.getParam('toAddress').split(':')[1])}><Text
          style={styles.nextButtonText}>Confirm</Text></TouchableOpacity>
      </View>
    </View>
  );

};


ConfirmTransactionScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Select Amount',
    headerRight: (
      <TouchableOpacity style={styles.closeButton} onPress={() => {
        navigation.popToTop()
      }}>
        <Ionicons name="ios-close" size={40} color="black" />
      </TouchableOpacity>
    ),
    headerLeft: null,
    headerRightContainerStyle: {
      paddingRight: 20
    },
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      borderBottomWidth: 0,
    }
  }
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  closeButton: {
    padding: 10,
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
  containerForText: {
  },
  keyboardButton: {
    justifyContent: 'center',
    width: '33%',
    height: 100,
  },
  keyboardText: {
    textAlign: 'center',
    color: Colors.green,
    fontSize: 28,
    fontWeight: '600'
  },
  backspace: {
    height: 30,
    width: 30,
  },
  nextButton: {
    backgroundColor: Colors.green,
    paddingVertical: 10,
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

export default ConfirmTransactionScreen;

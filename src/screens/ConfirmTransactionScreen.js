import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Crypto from '../components/utils/Crypto';

const ConfirmTransactionScreen = ({ navigation }) => {
  const [processing, setProcessing] = useState(false);

  const submitTransaction = async (amount, toAddress) => {
    setProcessing(true)
    try {
      await Crypto.signDAITransaction(amount, toAddress);      
      setProcessing(false)
      navigation.dismiss()
    } catch (err) {
      console.log(err)
    }
  };

  const shortenAddress = (address) => {
    const firstSix = address.substring(0, 6)
    const lastSix = address.substring(address.length - 6, address.length)
    return `${firstSix}...${lastSix}`
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', marginBottom: 100, paddingHorizontal: 50 }}>
        <View>
          <Text style={styles.header}>Send</Text>
          <Text style={styles.amountText}>${Crypto.formatToCurrency(navigation.getParam('amount'))}</Text>

          <Text style={[styles.header, styles.top]}>To</Text>
          {navigation.getParam('toUsername') && (
            <Text style={styles.amountText}>@{navigation.getParam('toUsername')}</Text>
          )}
          <Text style={[navigation.getParam('toUsername') ? styles.smalleAddress : styles.largeAddress]}>{shortenAddress(navigation.getParam('toAddress'))}</Text>
        </View>
      </View>

      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, processing ? styles.buttonDisabled : '']}
          onPress={() => submitTransaction(navigation.getParam('amount'), navigation.getParam('toAddress'))}
          disabled={processing}
        >
          <Text style={styles.submitButtonText}>{processing ? 'Processing...' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


ConfirmTransactionScreen.navigationOptions = ({ navigation }) => ({
  title: 'Confirm Transfer',
  headerRight: (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => {
        navigation.dismiss();
      }}
    >
      <Ionicons name="ios-close" size={40} color="black" />
    </TouchableOpacity>
  ),
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
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  closeButton: {
    padding: 10,
    margin: -10,
  },
  header: {
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '700',
    color: Colors.grey600,
  },
  top: {
    marginTop: 50
  },
  amountText: {
    fontSize: 48,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
    color: Colors.green
  },
  largeText: {
    fontSize: 40,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
    color: Colors.green
  },
  largeAddress: {
    fontSize: 26,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
    color: Colors.green
  },
  smalleAddress: {
    fontSize: 20,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
    color: Colors.gray700
  },
  submitButton: {
    backgroundColor: Colors.green,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonDisabled: {
    opacity: 0.5
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '600',
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 50,
  },
});

export default ConfirmTransactionScreen;

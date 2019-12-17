import React, {useState, useContext, useEffect} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';

import TransactionList from '../components/TransactionList';
import WalletActionButtons from '../components/WalletActionButtons';
import HeaderText from '../components/HeaderText';
import Colors from '../constants/Colors';
import Crypto from '../components/utils/Crypto'

const HomeScreen = () => {
  const [balance, setBalance] = useState('')


  useEffect(() => {
    (async () => {
      const ethBalance = await Crypto.getBalance();
      setBalance(ethBalance)
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.walletBalanceContainer}>
          <Text style={styles.walletBalanceText}>${balance}</Text>
        </View>
        <WalletActionButtons/>
        <HeaderText title="Transactions"/>
        <TransactionList/>
        <Text>{}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  walletActionButton: {
    width: 140,
    backgroundColor: Colors.green,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  walletActionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
  },
  walletBalanceText: {
    fontSize: 40,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'center',
  },
  walletBalanceContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 80,
    marginBottom: 50
  },
  transactions: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: '600',
  }
});

export default HomeScreen;


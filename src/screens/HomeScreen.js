import React, { useState, useContext, useEffect } from 'react';
import {
  Platform, ScrollView, RefreshControl, StyleSheet, Text, View
} from 'react-native';

import TransactionList from '../components/TransactionList';
import WalletActionButtons from '../components/WalletActionButtons';
import HeaderText from '../components/HeaderText';
import Colors from '../constants/Colors';
import Crypto from '../components/utils/Crypto';

import { Context as TransactionContext } from '../context/TransactionContext';
import { Context as AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const { state: authState } = useContext(AuthContext);
  const { getTransactions } = useContext(TransactionContext);
  const [balance, setBalance] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      setBalance(await Crypto.getBalance());
      getTransactions(authState.walletAddress)
    })();
  }, []);

  _onRefresh = async () => {
    setRefreshing(true);
    setBalance(await Crypto.getBalance());
    await getTransactions(authState.walletAddress)
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={_onRefresh}
              tintColor={Colors.green}
            />
          )}
      >
        <View style={styles.walletBalanceContainer}>
          <Text style={styles.walletBalanceText}>${Crypto.weiToInteger(balance)}</Text>
        </View>
        <WalletActionButtons />
        <HeaderText title="Transactions" />
        <TransactionList />
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

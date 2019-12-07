import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import { TransactionList } from '../components/TransactionList';
import WalletActionButtons from '../components/WalletActionButtons';
import { withNavigation } from 'react-navigation';


class HomeScreen extends Component {
  render = () => {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
  
          <View style={styles.walletBalanceContainer}>
            <Text style={styles.walletBalanceText}>$1,302.15</Text>
          </View>
  
          <WalletActionButtons />
    
          <Text style={styles.transactions}>Transactions</Text>
  
          <TransactionList />
  
        </ScrollView>
      </View>
    );  
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

export default withNavigation(HomeScreen);

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
    backgroundColor: 'green',
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

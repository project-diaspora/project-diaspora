import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as moment from 'moment';
import { Context as TransactionContext } from '../context/TransactionContext';
import Crypto from './utils/Crypto';
import { Context as AuthContext } from '../context/AuthContext';
import Colors from '../constants/Colors';

const TransactionList = () => {
  const { state, getTransactions } = useContext(TransactionContext);
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    getTransactions(authState.walletAddress);
  }, []);

  const toDateString = (timeStamp) => moment.unix(timeStamp).fromNow();

  const transactionName = (item) => {
    if (item.to === authState.walletAddress) {
      return 'Deposit';
    } if (item.from === authState.walletAddress) {
      return 'Withdrawal';
    }
    return 'Blockchain';
  };

  const plusMinus = (item) => {
    if (item.to === authState.walletAddress) {
      item.type = 'credit';
      return '+';
    } if (item.from === authState.walletAddress) {
      item.type = 'debit';
      return '-';
    }
    return '';
  };


  return (
    <View>
      <FlatList
        data={state.transactions}
        renderItem={({ item }) => (
          <View style={styles.transactionListContainer}>
            <Image
              source={require('../../assets/images/dai.png')}
              style={styles.imageStyle}
            />
            <View style={styles.transactionInformation}>
              <Text style={styles.transactionName}>{transactionName(item)}</Text>
              <Text style={styles.transactionDate}>{toDateString(item.timeStamp)}</Text>
            </View>
            <Text
              style={[styles.amount, item.credit ? styles.amountGreen : styles.amountGreen]}
            >
              {plusMinus(item)} ${Crypto.weiToInteger(item.value)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.transactionIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  transactionListContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 25,
    marginBottom: 20,
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  transactionInformation: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  transactionName: {
    fontWeight: '600',
    color: '#2d3748',
    fontSize: 18,
  },
  transactionDate: {
    color: '#a0aec0',
    fontSize: 16,
  },
  amount: {
    fontSize: 18,
  },
  amountRed: {
    color: Colors.red,
  },
  amountGreen: {
    color: Colors.green,
  },
});

export default TransactionList;

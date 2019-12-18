import React, { useContext, useEffect } from 'react';
import {
  View, Text, Image, StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as moment from 'moment';
import { Context as TransactionContext } from '../context/TransactionContext';


const TransactionList = () => {
  const { state, getTransactions } = useContext(TransactionContext);

  useEffect(() => {
    getTransactions();
  }, []);

  const toDateString = (timeStamp) => moment.unix(timeStamp).format('YYYY-MM-DD HH:mm');


  return (
    <View>
      <FlatList
        data={state.transactions}
        renderItem={({ item }) => (
          <View style={styles.transactionListContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=512&h=512&facepad=4' }}
              style={styles.imageStyle}
            />
            <View style={styles.transactionInformation}>
              <Text style={styles.transactionName}>Joe</Text>
              <Text style={styles.transactionDate}>{toDateString(item.timeStamp)}</Text>
            </View>
            <Text style={styles.amount}>
$
              {item.value}
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
    fontSize: 16,
  },
  transactionDate: {
    color: '#a0aec0',
  },
  amount: {
    fontSize: 16,
  }
});

export default TransactionList;

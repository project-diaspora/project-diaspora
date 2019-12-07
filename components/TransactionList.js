import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const transactions = [
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
  { imageSource: 'https://images.unsplash.com/photo-1521225099409-8e1efc95321d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=64&h=64&facepad=4', name: 'Tania El Hakim', date: 'two hours ago', amount: '5' },
]

export function TransactionList(props) {
  return (
    <View>
      <FlatList data={transactions} renderItem={({ item }) => 
        <View style={styles.transactionListContainer}>
          <Image source={{ uri: item.imageSource }} style={styles.imageStyle} />
          <View style={styles.transactionInformation}>
            <Text style={styles.transactionName}>{item.name}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
          <Text style={styles.amount}>${item.amount}</Text>
        </View>
      } />
    </View>
  );
}

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
})

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import {withNavigation} from 'react-navigation'

const WalletActionButtons = ({navigation}) => {

  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 20}}>
      <TouchableOpacity style={styles.walletActionButton} onPress={() => {
        navigation.navigate('AddMoney')
      }}>
        <Text style={styles.walletActionText}>Add money</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.walletActionButton} onPress={() => {
        navigation.navigate('SendMoneyFlow')
      }}>
        <Text style={styles.walletActionText}>Send</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  walletActionButton: {
    width: 160,
    backgroundColor: Colors.green,
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
  },
  walletActionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
  },
});

export default withNavigation(WalletActionButtons);

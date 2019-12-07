import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class WalletActionButtons extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.walletActionButton} onPress = {() => { this.props.navigation.push('AddMoney') }}>
          <Text style={styles.walletActionText}>Add money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.walletActionButton} onPress={() => { this.props.navigation.navigate('Send') }}>
          <Text style={styles.walletActionText}>Send</Text>
        </TouchableOpacity>
      </View>
    );  
  }
}

export default withNavigation(WalletActionButtons);

const styles = StyleSheet.create({
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
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
  },
})

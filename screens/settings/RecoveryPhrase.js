import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default class RecoveryPhrase extends Component {
  constructor(props) {
    super(props);
    this._getMnemonicfromSecureStorage();
    this.state = {
      mnemonic: '',
    }
  }

  static navigationOptions = () => {
    return {
      title: 'Recovery Phrase',
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
      },
    }
  };

  _getMnemonicfromSecureStorage = async () => {
    const authObjectString = await SecureStore.getItemAsync('authObject');
    const authObject = JSON.parse(authObjectString);
    this.setState({
      mnemonic: authObject.mnemonic
    })
  }

  render = () => {  
    return (
      <View style={styles.container}>

        <Text style={styles.mnemonic}>{ this.state.mnemonic }</Text>

      </View>
    );
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mnemonic: {
    fontSize: 16,
  }
})

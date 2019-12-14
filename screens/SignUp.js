import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import Colors from '../constants/Colors';
import Crypto from '../components/utils/Crypto'

class SignUp extends Component {
  constructor(props) {
    super(props);
    state = {
      username: ''
    }
  }
  
  signUp = async () => {
    // const mnemonic = await this.generateMnemonic()
    const mnemonic = await Crypto.generateMnemonic()
    const authObject = {
      username: this.state.username,
      mnemonic
    }
    const stringifiedAuthObject = JSON.stringify(authObject)
    SecureStore.setItemAsync('authObject', stringifiedAuthObject)

    const ethAddress = await Crypto.getWalletAddress('ETH')
    // AsyncStorage.setItemAsync('ETHAddress', ethAddress)
    const btcAddress = await Crypto.getWalletAddress('BTC')
    // AsyncStorage.setItemAsync('BTCAddress', btcAddresss)
    
    // share pubkeys with backend

    this.props.navigation.push('Main')
  }

  render = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Enter a username</Text>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={username => this.setState({ username: username.toLowerCase() })}
        />

        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => { this.signUp() }}>
          <Text style={[styles.buttonText, styles.signUpButtonText]}>Sign up</Text>
        </TouchableOpacity>

      </View>
    );  
  }
}
export default withNavigation(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.grey200,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '700',
  },
  signUpButton: {
    backgroundColor: Colors.green,
  },
  signUpButtonText: {
    color: 'white',
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: '600',
  }
});

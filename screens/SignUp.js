import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import * as Random from 'expo-random';
import * as SecureStore from 'expo-secure-store';
import Colors from '../constants/Colors';

const bip39 = require('bip39');

class SignUp extends Component {
  constructor(props) {
    super(props);
    state = {
      username: ''
    }
  }

  // move this function out
  generateMnemonic = async () => {
    const randomBytes = await Random.getRandomBytesAsync(16);
    let b = Buffer.from(randomBytes, 'base64').toString('hex');
    return bip39.entropyToMnemonic(b);
  }
  
  signUp = async () => {
    const mnemonic = await this.generateMnemonic()    
    const authObject = {
      username: this.state.username,
      mnemonic
    }
    const stringifiedAuthObject = JSON.stringify(authObject)
    SecureStore.setItemAsync('authObject', stringifiedAuthObject)

    // share pubkey with backend
    // use privkey to sign message hash
    
    this.props.navigation.push('Main')
  }

  render = () => {
    return (
      <View style={styles.container}>
          <Text style={styles.transactions}>Enter a username</Text>

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
    backgroundColor: '#fff',
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
  transactions: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: '600',
  }
});

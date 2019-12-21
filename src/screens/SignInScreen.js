import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput
} from 'react-native';
import Colors from '../constants/Colors';
import { Context as AuthContext } from '../context/AuthContext';


const SignInScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [mnemonic, setMnemonic] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter a username</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(usernameUpdate) => setUsername(usernameUpdate)}
      />
      <Text style={styles.header}>Enter 12-word mnemonic</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(mnemonicUpdate) => setMnemonic(mnemonicUpdate)}
      />
      <TouchableOpacity
        style={[styles.button, styles.signInButton]}
        onPress={() => {
          signin(username, mnemonic)
          setMnemonic('')
        }}
      >
        <Text style={[styles.buttonText, styles.signInButtonText]}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};


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
  signInButton: {
    backgroundColor: Colors.green,
  },
  signInButtonText: {
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

export default SignInScreen;

import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const RecoveryPhraseScreen = () => {

  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    getMnemonicfromSecureStorage()
  }, []);


  const getMnemonicfromSecureStorage = async () => {
    const authObjectString = await SecureStore.getItemAsync('authObject');
    const authObject = JSON.parse(authObjectString);
    setMnemonic(authObject.mnemonic)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mnemonic}>{mnemonic}</Text>
    </View>
  );
};

RecoveryPhraseScreen.navigationOptions = () => {
  return {
    title: 'Recovery Phrase',
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      borderBottomWidth: 0,
    },
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mnemonic: {
    fontSize: 16,
  }
});

export default RecoveryPhraseScreen

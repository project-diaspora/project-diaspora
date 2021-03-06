import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Crypto from '../components/utils/Crypto';
import Colors from '../constants/Colors';

const RecoveryPhraseScreen = () => {
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    getMnemonicfromSecureStorage();
  }, []);


  const getMnemonicfromSecureStorage = async () => {
    const mnemonic = await Crypto.getStoredMnemonic();
    setMnemonic(
      mnemonic
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mnemonic}>{mnemonic}</Text>
    </View>
  );
};

RecoveryPhraseScreen.navigationOptions = {
  title: 'Recovery Phrase',
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: Colors.green,
  },
  headerTintColor: 'white',
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

export default RecoveryPhraseScreen;

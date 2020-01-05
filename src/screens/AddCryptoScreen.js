import React, { useState, useContext, useEffect } from 'react';
import {
  Platform, View, Text, StyleSheet, TouchableOpacity, Clipboard
} from 'react-native';
import QRAndroid from 'react-native-qrcode';
import QRIos from 'react-native-qrcode-svg';
import Currencies from '../constants/Currencies';
import { Context as AuthContext } from '../context/AuthContext';
import Colors from '../constants/Colors'

const AddCryptoScreen = ({ navigation }) => {
  const [crypto, setCrypto] = useState(null);
  const [copyText, setcopyText] = useState('Copy');
  const { state } = useContext(AuthContext);

  useEffect(() => {
    getCrypto();
  });

  const copyWallet = (wallet) => {
    Clipboard.setString(wallet)
    setcopyText('Copied!')
    setTimeout(() => {
      setcopyText('Copy')
    }, 2000);
  }

  const getCrypto = () => {
    setCrypto(navigation.getParam('crypto'));
  };

  return (
    <View style={styles.modalContainer}>
      {crypto && (
        <View>
          <Text style={styles.cryptoHeader}>{Currencies[crypto].name} ({crypto})</Text>
          <Text style={styles.warningMessage}>KOVAN TESTNET ONLY</Text>
          <View style={styles.qrCode}>
            {Platform.OS === 'android' && <QRAndroid
              value={state.walletAddress}
              size={200}
            />}
            {Platform.OS === 'ios' && <QRIos
              value={state.walletAddress}
              size={200}
            />}
          </View>
          <Text style={styles.cryptoAddress}>{state.walletAddress}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={() => copyWallet(state.walletAddress)}>
            <Text style={styles.copyText}>{copyText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

AddCryptoScreen.navigationOptions = () => ({
  title: 'Add Crypto',
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
  },
});


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  cryptoHeader: {
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  warningMessage: {
    backgroundColor: Colors.red,
    color: 'white',
    paddingVertical: 5,
    fontWeight: '800',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 24
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey300,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    marginHorizontal: 50,
    marginBottom: 15,
    justifyContent: 'center'
  },
  paymentImage: {
    width: 40,
    height: 40
  },
  qrCode: {
    alignItems: 'center',
    marginVertical: 20,
  },
  copyText: {
    marginLeft: 5,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.05,
    fontSize: 16
  },
  cryptoAddress: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  }
});

export default AddCryptoScreen;

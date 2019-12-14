import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Currencies from '../constants/Currencies'
import * as AsyncStorage from "expo-secure-store";

const AddCryptoScreen = ({navigation}) => {

  const [crypto, setCrypto] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    getWalletAddressFromStorage().catch(console.log);
    getCrypto();
  }, []);


  const getCrypto = () => {
    console.log(navigation.getParam('crypto'))
    setCrypto(navigation.getParam('crypto'))
  };

  const getWalletAddressFromStorage = async () => {
    const addressFromStorage = await AsyncStorage.getItemAsync(`${crypto}Address`);
    setWalletAddress(addressFromStorage)
  };


  return (
    <View style={styles.modalContainer}>
      {/*<Text style={styles.cryptoHeader}>{Currencies[crypto].name} ({crypto})</Text>*/}
      <Text style={styles.cryptoHeader}>{Currencies[crypto]} ({crypto})</Text>
      <View style={styles.qrCode}>
        <QRCode
          value={walletAddress}
          size={200}
        />
      </View>
      <Text style={styles.cryptoAddress}>{walletAddress}</Text>
      <TouchableOpacity style={styles.copyButton}>
        <Text style={styles.copyText}>Copy</Text>
      </TouchableOpacity>
    </View>
  );


};

AddCryptoScreen.navigationOptions = () => {
  return {
    title: 'Add Crypto',
    headerStyle: {
      shadowColor: 'transparent',
      elevation: 0,
      borderBottomWidth: 0,
    },
  }
};


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
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#edf2f7',
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    fontWeight: '600',
    letterSpacing: 0.05,
  },
  cryptoAddress: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  }
});

export default AddCryptoScreen

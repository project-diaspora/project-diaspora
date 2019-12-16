import React, { useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Currencies from '../constants/Currencies'
import Crypto from '../components/utils/Crypto'
import { Context as AuthContext } from "../context/AuthContext";

const AddCryptoScreen = ({navigation}) => {
  const [crypto, setCrypto] = useState(null);
  const { state } = useContext(AuthContext);
  console.log(crypto)

  useEffect(() => {
    (async () => {
      await getCrypto();
    })();
  }, []);

  const getCrypto = async () => {
    await setCrypto(navigation.getParam('crypto'))
  };

  return (
    <View style={styles.modalContainer}>
      {crypto && (
        <View>
          <Text style={styles.cryptoHeader}>{Currencies[crypto].name} ({crypto})</Text>
          <View style={styles.qrCode}>
            <QRCode
              value={state.walletAddress}
              size={200}
            />
          </View>
          <Text style={styles.cryptoAddress}>{state.walletAddress}</Text>
          <TouchableOpacity style={styles.copyButton}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
      )}
    </View >
  )
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

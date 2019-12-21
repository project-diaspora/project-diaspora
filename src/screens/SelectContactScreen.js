import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Modal, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView
} from 'react-native';
import Colors from '../constants/Colors'
import Crypto from '../components/utils/Crypto'
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';

export default function SelectContactScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let address
    if (data.includes(':')) {
      address = data.split(':')[1]
    }
    try {
      Crypto.validateAddress(address)
      next(address)
    } catch (error) {
      // error
    }
  };

  const openScanner = async () => {
    if (hasPermission === null) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    } else if (hasPermission === false) {
      return new Error('no access to camera')
    }
    setScannerVisible(true)
  }

  const next = (address) => {
    navigation.navigate('ConfirmTransaction', { amount: navigation.getParam('amount'), toAddress: address });
  }

  return (
    <View style={styles.container}>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.inputSearch}
          autoCompleteType={'off'}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus={true}
          importantForAutofill={'no'}
          placeholder={'Search for a username or address'}
          placeholderTextColor={Colors.grey700}
          onChangeText={(usernameUpdate) => setUsername(usernameUpdate)}
        />
        <TouchableOpacity style={styles.qrButton} onPress={() => openScanner()}>
          <Ionicons
            name="ios-qr-scanner"
            size={30}
            color={Colors.grey800}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => next(username)}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={scannerVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <SafeAreaView style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scannerWrapper}
          />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ padding: 20 }}
              onPress={() => setScannerVisible(!scannerVisible)}>
              <Ionicons
                style={{ textAlign: 'right' }}
                name="ios-close-circle"
                size={30}
                color={'white'}
              />
            </TouchableOpacity>
            <Text style={styles.scannerText}>Scan a QR code</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

SelectContactScreen.navigationOptions = () => ({
  title: 'Send to',
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scannerWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  scannerText: { 
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    letterSpacing: 0.5,
    fontWeight: '800',
    marginBottom: 50
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: '600',
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colors.grey300,
    borderWidth: 1,
    backgroundColor: Colors.grey300,
    borderRadius: 5,
    paddingLeft: 15,
  },
  inputSearch: {
    paddingVertical: 15
  },
  nextButton: {
    backgroundColor: Colors.green,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 50,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '600',
  },
  qrButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10
  },
})
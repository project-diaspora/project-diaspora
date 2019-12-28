import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Modal, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import Crypto from '../components/utils/Crypto';
import Colors from '../constants/Colors';
import api from '../api/backend';
import AppButton from '../components/AppButton';
import Spacer from '../components/Spacer';
import InfoAlert from '../components/InfoAlert';


export default function SelectContactScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setErrorMessage(null);
    setScanned(true);
    let address;
    if (data.includes(':')) {
      address = data.split(':')[1];
    }
    try {
      Crypto.validateAddress(address);
      setScannerVisible(false);
      next(address);
    } catch (err) {
      setErrorMessage('Invalid address');
    }
    setScanned(false);
  };

  const openScanner = async () => {
    if (hasPermission === null) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    } else if (hasPermission === false) {
      return new Error('no access to camera');
    }
    setScannerVisible(true);
  };

  // TODO: Abstract away all validation logic from components
  const checkInput = async (input) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      Crypto.validateAddress(input);
      next(input);
    } catch (error) {
      const user = await api.searchUser(input);
      if (user) {
        next(user.walletAddress, user.username);
      } else {
        setErrorMessage('Invalid username or address');
      }
    }
  };

  const next = (address, username) => {
    const navObject = { amount: navigation.getParam('amount'), toAddress: address };
    if (username) {
      navObject.toUsername = username;
    }
    navigation.navigate('ConfirmTransaction', navObject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.inputSearch}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          importantForAutofill="no"
          placeholder="Search for a username or address"
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
      {errorMessage ? <InfoAlert type="info" message={errorMessage} /> : null}
      <Spacer />
      <AppButton
        isDisabled={isLoading}
        isLoading={isLoading}
        buttonStyle="primaryButton"
        textStyle="primaryText"
        title="Search"
        onSubmit={() => {
          checkInput(username).catch((err) => {
            // TODO: FOR DEBUG ONLY
            // FIXME: Returns a 503 on search - check API
            console.log(err);
            setErrorMessage('We couldn\'t find anyone by that name or address');
            setIsLoading(false);
          });
        }}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={scannerVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scannerWrapper}
          />
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ padding: 20 }}
              onPress={() => setScannerVisible(!scannerVisible)}
            >
              <Ionicons
                style={{ textAlign: 'right' }}
                name="ios-close-circle"
                size={30}
                color="white"
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
  headerBackTitle: null,
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
  errorText: {
    color: Colors.red,
    padding: 5,
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
});

import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity, Modal, Linking, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import QRCode from 'react-native-qrcode-svg';
import Currencies from '../../constants/Currencies'

class AddCrypto extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Crypto',
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
      },
    }
  };

  render = () => {  
    const crypto = this.props.navigation.getParam('crypto').toUpperCase()
    return (
      <View style={styles.modalContainer}>

        <Text style={styles.cryptoHeader}>{ Currencies[crypto].name } ({ crypto })</Text>

        <View style={styles.qrCode}>
          <QRCode
            value='1andreas3batLhQa2FawWjeyjCqyBzypd'
            size={200}
            />
        </View>

        <Text style={styles.cryptoAddress}>1andreas3batLhQa2FawWjeyjCqyBzypd</Text>

        <TouchableOpacity style={styles.copyButton}>
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>

      </View>
    );
  
  }
}

export default withNavigation(AddCrypto);

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
    paddingVertical: 8,
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
})

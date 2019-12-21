import React from 'react';
import {
  Platform, View, Text, StyleSheet, Image, TouchableOpacity, Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const AddMoneyScreen = ({ navigation }) => (
  <View style={styles.modalContainer}>

    <Text style={styles.paymentTypes}>Credit Card</Text>

    <TouchableOpacity
      style={styles.paymentButton}
      onPress={() => {
        navigation.navigate('AddCard');
      }}
    >
      <Ionicons name="ios-card" size={35} color={Colors.green} />
      <Text style={styles.paymentText}>{Platform.OS === 'ios' ? 'Pay with Apple Pay' : 'Pay with Google Pay'}</Text>
    </TouchableOpacity>

    <Text style={styles.paymentTypes}>Digital Currencies</Text>

    <TouchableOpacity
      style={styles.paymentButton}
      onPress={() => {
        navigation.navigate('AddCrypto', { crypto: 'ETH' });
      }}
    >
      <Image source={require('../../assets/images/eth.png')} style={styles.paymentImage} />
      <Text style={styles.paymentText}>Add Ethereum</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.paymentButton}
      onPress={() => {
        navigation.navigate('AddCrypto', { crypto: 'DAI' });
      }}
    >
      <Image source={require('../../assets/images/dai.png')} style={styles.paymentImage} />
      <Text style={styles.paymentText}>Add DAI (US dollar)</Text>
    </TouchableOpacity>

  </View>
);

AddMoneyScreen.navigationOptions = ({ navigation }) => ({
  title: 'Add Money',
  headerRight: (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => {
        navigation.popToTop();
      }}
    >
      <Ionicons name="ios-close" size={40} color="black" />
    </TouchableOpacity>
  ),
  headerBackTitle: null,
  headerLeft: null,
  headerRightContainerStyle: {
    paddingRight: 20
  },
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
    marginTop: 30,
    paddingHorizontal: 10,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: -10,
  },
  paymentTypes: {
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 24,
    fontWeight: '600',
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey300,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  paymentImage: {
    width: 40,
    height: 40
  },
  paymentText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  }
});

export default AddMoneyScreen;

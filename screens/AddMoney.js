import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Linking, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';

class AddMoney extends Component {
  static navigationOptions = ({ navigation }) => {

    return {
      title: 'Add Money',
      headerRight: (
        <TouchableOpacity style={styles.closeButton} onPress = {() => { navigation.popToTop() } }>
          <Ionicons name="ios-close" size={40} color="black" />
        </TouchableOpacity>
      ),
      headerLeft: null,
      headerRightContainerStyle: {
        paddingRight: 20
      },
      headerStyle: {
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
      },
    }
  };

  render = () => {
    return (
      <View style={styles.modalContainer}>

        <Text style={styles.paymentTypes}>Credit Card</Text>
        
        <TouchableOpacity style={styles.paymentButton} onPress={ () => Linking.openURL('https://pay.sendwyre.com') }>
          <Ionicons name="ios-card" size={35} color={Colors.green} />
          <Text style={styles.paymentText}>Pay with Apple Pay</Text>
        </TouchableOpacity>

        <Text style={styles.paymentTypes}>Digital Currencies</Text>

        <TouchableOpacity style={styles.paymentButton} onPress = { () => { this.props.navigation.navigate('AddCrypto', { crypto: 'ETH' }) }}>
          <Image source={require('../assets/images/eth.png')} style={styles.paymentImage} />
          <Text style={styles.paymentText}>Add Ethereum</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentButton} onPress = { () => { this.props.navigation.navigate('AddCrypto', { crypto: 'DAI' }) }}>
          <Image source={require('../assets/images/dai.png')} style={styles.paymentImage} />
          <Text style={styles.paymentText}>Add DAI (US dollar)</Text>
        </TouchableOpacity>

      </View>
    );
  
  }
}

export default withNavigation(AddMoney);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  closeButton: {
    padding: 10,
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
    backgroundColor: '#edf2f7',
    paddingHorizontal: 20,
    paddingVertical: 8,
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
})

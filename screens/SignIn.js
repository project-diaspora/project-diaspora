import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';


class AuthLanding extends Component {
  render = () => {
    return (
      <View style={styles.container}>
    
        <TouchableOpacity>
          <Text style={styles.transactions}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.transactions}>Sign in</Text>
        </TouchableOpacity>
  
  
      </View>
    );  
  }
}

AuthLanding.navigationOptions = {
  header: null,
};

export default withNavigation(AuthLanding);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  walletActionButton: {
    width: 140,
    backgroundColor: Colors.green,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  walletActionText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
  },
  walletBalanceText: {
    fontSize: 40,
    color: '#2d3748',
    fontWeight: '600',
    textAlign: 'center',
  },
  walletBalanceContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 80,
    marginBottom: 50
  },
  transactions: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: '600',
  }
});

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';

import { withNavigation } from 'react-navigation';


class AuthLanding extends Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <View style={styles.container}>
    
        <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => { this.props.navigation.push('SignUp') }}>
          <Text style={[styles.buttonText, styles.signUpButtonText]}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.nagivate('SignIn') }}>
          <Text style={styles.buttonText}>Sign in</Text>
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
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  button: {
    backgroundColor: Colors.grey200,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    fontWeight: '700',
  },
  signUpButton: {
    backgroundColor: Colors.green,
  },
  signUpButtonText: {
    color: 'white',
  },
  transactions: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: '600',
  }
});

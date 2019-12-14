import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';

class AuthLanding extends Component {
  render = () => {
    return (
      <View style={styles.container}>
    
        <TouchableOpacity>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
  },
  buttonText: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 24,
    fontWeight: '600',
  }
});

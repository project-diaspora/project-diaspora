import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

const SignInScreen = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
      <Text style={styles.buttonText}>Sign up</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
      <Text style={styles.buttonText}>Sign in</Text>
    </TouchableOpacity>
  </View>
);

SignInScreen.navigationOptions = {
  header: null,
};

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

export default SignInScreen;

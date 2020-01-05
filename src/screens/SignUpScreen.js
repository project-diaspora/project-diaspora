import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, View, TextInput
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import InfoAlert from '../components/InfoAlert';
import AppButton from '../components/AppButton';
import Spacer from '../components/Spacer';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


const SignUpScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillBlur={clearErrorMessage}
      />
      <Text style={styles.header}>Create a Username</Text>
      <View style={styles.usernameContainer}>
        <Ionicons name="ios-at" size={25} color={Colors.grey800} />
        <TextInput
          style={styles.inputStyles}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          enablesReturnKeyAutomatically
          placeholder="KahlilGibran"
          placeholderTextColor={Colors.grey700}
          importantForAutofill="no"
          onChangeText={(usernameUpdate) => setUsername(usernameUpdate)}
        />
      </View>
      <Spacer />
      {state.errorMessage !== '' ? <InfoAlert type="error" message={state.errorMessage} /> : null}
      <AppButton
        isDisabled={state.isLoading}
        isLoading={state.isLoading}
        buttonStyle="primaryButton"
        textStyle="primaryText"
        title="Sign Up"
        onSubmit={() => {
          signup(username);
        }}
      />
    </View>
  );
};

SignUpScreen.navigationOptions = {
  headerStyle: {
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0,
  },
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 50
  },
  header: {
    marginBottom: 6,
    fontSize: 20,
    fontWeight: '600',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey300,
    borderColor: Colors.grey300,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
  },
  inputStyles: {
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 15,
    overflow: 'hidden'
  }
});

export default SignUpScreen;

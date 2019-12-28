import React, { useState, useContext } from 'react';
import {
  StyleSheet, Text, View, TextInput
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import InfoAlert from '../components/InfoAlert';
import AppButton from '../components/AppButton';
import Spacer from '../components/Spacer';


const SignUpScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillBlur={clearErrorMessage}
      />
      <Text style={styles.header}>Create a username</Text>
      <TextInput
        style={styles.inputStyles}
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        placeholder="johndoe"
        importantForAutofill="no"
        onChangeText={(usernameUpdate) => setUsername(usernameUpdate)}
      />
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 100
  },
  header: {
    marginBottom: 6,
    fontSize: 18,
    fontWeight: '600',
  },
  inputStyles: {
    borderRadius: 10,
    height: 50,
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden'
  }
});

export default SignUpScreen;

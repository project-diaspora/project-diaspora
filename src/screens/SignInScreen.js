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


const SignInScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [mnemonic, setMnemonic] = useState('');

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillBlur={clearErrorMessage}
      />
      <Text style={styles.header}>Enter Recovery Phrase (12 Words)</Text>
      <TextInput
        style={styles.inputStyles}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="off"
        autoFocus
        enablesReturnKeyAutomatically
        multiline
        placeholderTextColor={Colors.grey800}
        onChangeText={(mnemonicUpdate) => setMnemonic(mnemonicUpdate)}
        placeholder="fish jeans million animal ..."
      />
      <Spacer />
      {state.errorMessage !== '' ? <InfoAlert type="error" message={state.errorMessage} /> : null}

      <AppButton
        isDisabled={state.isLoading}
        isLoading={state.isLoading}
        buttonStyle="primaryButton"
        textStyle="primaryText"
        title="Sign In"
        onSubmit={() => {
          signin(mnemonic);
          setMnemonic('');
        }}
      />
    </View>
  );
};

SignInScreen.navigationOptions = {
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
  inputStyles: {
    borderColor: Colors.grey300,
    borderWidth: 1,
    backgroundColor: Colors.grey300,
    borderRadius: 5,
    height: 50,
    padding: 10,
    overflow: 'hidden'
  }
});

export default SignInScreen;

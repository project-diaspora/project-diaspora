import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import Spacer from '../components/Spacer';

const AuthLandingScreen = ({ navigation }) => (
  <View style={styles.container}>
    <AppButton
      buttonStyle="primaryButton"
      textStyle="primaryText"
      title="Sign Up"
      onSubmit={() => {
        navigation.navigate('SignUp');
      }}
    />
    <Spacer />
    <AppButton
      buttonStyle="secondaryButton"
      textStyle="secondaryText"
      title="Sign In"
      onSubmit={() => {
        navigation.navigate('SignIn');
      }}
    />
    <Spacer />
  </View>
);

AuthLandingScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 15
  }
});

export default AuthLandingScreen;

import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import Spacer from '../components/Spacer';

const AuthLandingScreen = ({ navigation }) => (
  <View style={styles.container}>

    <Image source={require('../../assets/images/inverse-logo.png')} style={styles.logo} />

    <View style={styles.buttonsContainer}>
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
    </View>
  </View>
);

AuthLandingScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 15,
  },
  buttonsContainer: {
    width: '100%',
  },
  logo: {
    marginTop: 75,
    width: 250,
    height: 250,
  }
});

export default AuthLandingScreen;

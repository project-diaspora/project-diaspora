import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import AppButton from './AppButton';

const WalletActionButtons = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.actionWrapper}>
      <View style={styles.buttonContainer}>
        <AppButton
          buttonStyle="primaryButton"
          textStyle="primaryText"
          title="Add Money"
          onSubmit={() => {
            navigation.navigate('AddMoney');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          buttonStyle="primaryButton"
          textStyle="primaryText"
          title="Send"
          onSubmit={() => {
            navigation.navigate('sendMoneyFlow');
          }}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  actionWrapper: {
    maxWidth: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: '2%'
  }
});

export default withNavigation(WalletActionButtons);

import React from 'react';
import { Platform, Button, Modal, Image, TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import Constants from 'expo-constants';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      modalVisible: false,
      failedCount: 0,
    };
  }

  _clearState = () => {
    this.setState({ failedCount: 0 });
  };

  _setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  _scanFingerPrint = async () => {
    try {
      let results = await LocalAuthentication.authenticateAsync({
        fallbackLabel: 'hello'
      });
      if (results.success) {
        this.setState({
          modalVisible: false,
        });
        this.props.navigation.navigate('Main');
      } else {
        this.setState({
          failedCount: this.state.failedCount + 1,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  _tryBiometrics = () => {
    this._clearState();
    if (Platform.OS === 'android') {
      this._setModalVisible(!this.state.modalVisible);
    } else {
      this._scanFingerPrint();
    }
  }

  _bootstrapAsync = async () => {
    const authObject = await SecureStore.getItemAsync('authObject');

    // skip biometrics if on expo or simulator
    if (!Constants.isDevice || Constants.appOwnership === 'expo') {
      this.props.navigation.navigate(authObject ? 'Main' : 'Auth');
      return;
    }

    if (authObject) {
      this._tryBiometrics();
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          this.state.modalVisible
            ? { backgroundColor: '#b7b7b7' }
            : { backgroundColor: 'white' },
        ]}>
        <Button
          title='Begin Authentication'
          onPress={() => {
            this._clearState();
            if (Platform.OS === 'android') {
              this._setModalVisible(!this.state.modalVisible);
            } else {
              this._scanFingerPrint();
            }
          }}
        />

        {this.state.authenticated && (
          <Text style={styles.text}>Authentication Successful! 🎉</Text>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onShow={this.scanFingerPrint}>
          <View style={styles.modal}>
            <View style={styles.innerContainer}>
              <Text>Sign in with fingerprint</Text>
              <Image
                style={{ width: 128, height: 128 }}
                source={{ uri: 'http://www.pngonly.com/wp-content/uploads/2017/06/Fingerprint-Digital-PNG.png'}}
              />
              {this.state.failedCount > 0 && (
                <Text style={{ color: 'red', fontSize: 14 }}>
                  Failed to authenticate, press cancel and try again.
                </Text>
              )}
              <TouchableHighlight
                onPress={async () => {
                  LocalAuthentication.cancelAuthenticate();
                  this._setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 8,
  },
  modal: {
    flex: 1,
    marginTop: '90%',
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    marginTop: '30%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 22,
    paddingTop: 20,
  },
});
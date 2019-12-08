import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    state = {
      authObject: null
    }
  }

  _bootstrapAsync = async () => {
    const authObject = await SecureStore.getItemAsync('authObject');

    this.props.navigation.navigate(authObject ? 'Main' : 'Auth');
    // this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

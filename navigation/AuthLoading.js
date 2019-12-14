import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';


const AuthLoadingScreen = ({navigation}) => {
  
  useEffect(() => {
  _bootstrapAsync()
  }, [])

  const _bootstrapAsync = async () => {
    const authObject = await SecureStore.getItemAsync('authObject');

    navigation.navigate(authObject ? 'Main' : 'Auth');
  };

  return null;
}

export default AuthLoadingScreen;
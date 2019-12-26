import * as SecureStore from 'expo-secure-store';
import createDataContext from './createDataContext';
import api from '../api/backend';

import { navigate } from '../navigationRef';

import Crypto from '../components/utils/Crypto';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', username: action.payload.username, walletAddress: action.payload.walletAddress };
    case 'signout':
      return { errorMessage: '', username: null, walletAddress: null };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const username = await SecureStore.getItemAsync('username');
  const walletAddress = await SecureStore.getItemAsync('walletAddress');

  if (username && walletAddress) {
    dispatch({ type: 'signin', payload: { username, walletAddress } });
    navigate('mainFlow');
  } else {
    navigate('loginFlow');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => async (username) => {
  try {
    await SecureStore.deleteItemAsync('walletAddress')
    await SecureStore.deleteItemAsync('mnemonic')
    await SecureStore.deleteItemAsync('username')
    await Crypto.generateMnemonic();
    const walletAddress = await Crypto.getWalletAddress();
    await api.createUser(username, walletAddress)
    await SecureStore.setItemAsync('username', username);
    await SecureStore.setItemAsync('walletAddress', walletAddress)
    dispatch({ type: 'signin', payload: { username, walletAddress } });
    navigate('Onboarding');
  } catch (err) {
    console.log(err);
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
  }
};


const signin = (dispatch) => async (username, mnemonic) => {
  try {
    await Crypto.tryMnemonic(mnemonic);
    mnemonic = null
    const walletAddress = await Crypto.getWalletAddress();
    await SecureStore.setItemAsync('username', username);
    dispatch({ type: 'signin', payload: { username, walletAddress } });
    navigate('mainFlow');
  } catch (err) {
    console.log(err);
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
  }
};


const signout = () => async () => {
  try {
    await SecureStore.deleteItemAsync('username');
    await SecureStore.deleteItemAsync('walletAddress');
    await SecureStore.deleteItemAsync('mnemonic');
    // clear store
    navigate('loginFlow');
  } catch (err) {
    console.log(err);
  }
};


export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin, signout, signup, clearErrorMessage, tryLocalSignin
  },
  { username: null, walletAddress: null, errorMessage: '' }
);

import * as SecureStore from 'expo-secure-store';
import createDataContext from './createDataContext';

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
    await Crypto.generateMnemonic();
    const walletAddress = await Crypto.getWalletAddress();
    await SecureStore.setItemAsync('username', username);
    dispatch({ type: 'signin', payload: { username, walletAddress } });


    navigate('mainFlow');
  } catch (err) {
    console.log(err);
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
  }
};


const signin = (dispatch) => async () => {
  // TODO: FIX ME
  // try {
  //   const response = await trackerApi.post('/signin', {email, password})
  //   await AsyncStorage.setItem('token', response.data.token)
  //   dispatch({type: 'signin', payload: response.data.token})
  //   navigate('TrackList')
  // } catch (err) {
  //   dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
  // }
};


const signout = () => async () => {
  try {
    await SecureStore.deleteItemAsync('authObject');
    console.log('signout');
    // more deleting
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

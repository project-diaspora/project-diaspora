import * as SecureStore from 'expo-secure-store';
import createDataContext from './createDataContext';
import api from '../api/backend';
import { navigate } from '../navigationRef';
import Crypto from '../components/utils/Crypto';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {
        errorMessage: '', isLoading: false, username: action.payload.username, walletAddress: action.payload.walletAddress
      };
    case 'signout':
      return { errorMessage: '', username: null, walletAddress: null };
    case 'add_error_message':
      return { ...state, isLoading: false, errorMessage: action.payload };
    case 'set_loading_flag':
      return { ...state, isLoading: true };
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
  if (!username) {
    dispatch({ type: 'add_error_message', payload: 'Username can\'t be empty.' });
    return;
  }
  try {
    dispatch({ type: 'set_loading_flag' });
    await SecureStore.deleteItemAsync('walletAddress');
    await SecureStore.deleteItemAsync('mnemonic');
    await SecureStore.deleteItemAsync('username');
    await Crypto.generateMnemonic();
    const walletAddress = await Crypto.getWalletAddress();
    await api.createUser(username);
    await SecureStore.setItemAsync('username', username);
    await SecureStore.setItemAsync('walletAddress', walletAddress);
    dispatch({ type: 'signin', payload: { username, walletAddress } });
    navigate('Onboarding');
  } catch (err) {
    dispatch({ type: 'add_error_message', payload: 'Something went wrong with sign up. Please try again.' });
  }
};


const signin = (dispatch) => async (mnemonic) => {
  try {
    dispatch({ type: 'set_loading_flag' });
    await Crypto.tryMnemonic(mnemonic);
    mnemonic = null;
    const userInfo = await api.loginUser();
    if (!userInfo.data[0]) {
      dispatch({ type: 'add_error_message', payload: 'Oops! This recovery phrase is not associated to a Massari account.' });
    }
    const walletAddress = await Crypto.getWalletAddress();
    await SecureStore.setItemAsync('username', username);
    dispatch({ type: 'signin', payload: { username, walletAddress } });
    navigate('mainFlow');
  } catch (err) {
    dispatch({ type: 'add_error_message', payload: 'Oops! We couldn\'t validate your mnemonic.' });
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
  {
    username: null, walletAddress: null, isLoading: false, errorMessage: ''
  }
);

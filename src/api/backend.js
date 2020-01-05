import axios from 'axios';
import { ethers } from 'ethers';
import * as SecureStore from 'expo-secure-store';

import getEnvVars from '../../environment';
const env = getEnvVars();

const signMessage = async (message) => {
  const mnemonic = await SecureStore.getItemAsync('mnemonic');
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
  return wallet.signMessage(message);
}

const constructOptions = async (options) => {
  const timestamp = Date.now();
  const signature = await signMessage(`${options.path}|${timestamp}`);

  options.url = `${env.apiUrl}/${options.path}`
  options.headers = {
    'x-massari-signature': signature,
    'x-massari-timestamp': timestamp,
  };
  delete options.path;
  return options;
}

const callBackend = async (preparedOptions) => {
  const options = await constructOptions(preparedOptions);
  try {
    const res = await axios(options)
    return res.data
  } catch (err) {
    throw err
  }
};

export default {
  searchUser: async (username) => {
    const prepareOptions = {
      method: 'GET',
      path: `users/${username}`
    };
    return callBackend(prepareOptions);
  },

  createUser: async (username) => {
    const prepareOptions = {
      method: 'POST',
      path: 'users',
      data: {
        username,
      }
    };
    return callBackend(prepareOptions);
  },

  loginUser: async () => {
    const prepareOptions = {
      method: 'GET',
      path: 'users'
    };
    return callBackend(prepareOptions);
  },

  getTransactions: async () => {
    const prepareOptions = {
      method: 'GET',
      path: 'transactions'
    }
    return callBackend(prepareOptions);
  },

  submitTransaction: async (tx) => {
    const prepareOptions = {
      method: 'POST',
      path: 'transactions',
      data: tx
    }
    return callBackend(prepareOptions);
  }
}

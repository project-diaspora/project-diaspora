import axios from 'axios';
import { ethers } from 'ethers';
import * as SecureStore from 'expo-secure-store';

import getEnvVars from '../../environment';
const env = getEnvVars();

const signMessage = async (message) => {
  const mnemonic = await SecureStore.getItemAsync('mnemonic')
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic)
  return wallet.signMessage(message)
}

const constructOptions = async (options) => {
  const timestamp = Date.now()
  const signature = await signMessage(`${options.path}|${timestamp}`)
  
  options.url = `${env.apiUrl}/${options.path}`
  options.headers = {
    'x-massari-signature': signature,
    'x-massari-path': options.path,
    'x-massari-timestamp': timestamp,
  }
  delete options.path;
  return options
}

export default {
  searchUser: async (username) => {
    const prepareOptions = {
      method: 'GET',
      path: `users/${username}`
    };
    const options = await constructOptions(prepareOptions)
    const res = await axios(options);
    return res.data
  },

  createUser: async (username, walletAddress) => {
    const prepareOptions = {
      method: 'POST',
      path: 'users',
      data: {
        username: username,
        wallet_address: walletAddress
      }
    };
    const options = await constructOptions(prepareOptions)
    const res = await axios(options);
    return res.data
  },
}
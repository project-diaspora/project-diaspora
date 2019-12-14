import * as Random from 'expo-random';
const bip39 = require('bip39');
import { ethers } from 'ethers';

const generateMnemonic = async () => {
  const randomBytes = await Random.getRandomBytesAsync(16);
  let b = Buffer.from(randomBytes, 'base64').toString('hex');
  return bip39.entropyToMnemonic(b);
};

const getWalletAddress = (mnemonic, currency) => {
  switch (currency) {
    case 'ETH':
      const ethWallet = new ethers.Wallet.fromMnemonic(mnemonic);
      return ethWallet.address
  }
};

export default {generateMnemonic, getWalletAddress}
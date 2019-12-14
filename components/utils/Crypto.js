import * as Random from 'expo-random';
const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
import { ethers } from 'ethers';

export default {

  generateMnemonic = async () => {
    const randomBytes = await Random.getRandomBytesAsync(16);
    let b = Buffer.from(randomBytes, 'base64').toString('hex');
    return bip39.entropyToMnemonic(b);
  },

  getWalletAddress = async (currency) => {
    switch (currency) {
      case 'ETH':
        const ethWallet = new ethers.Wallet.fromMnemonic(mnemonic);
        return ethWallet.address
      case 'BTC':
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bitcoin.bip32.fromSeed(seed);
        const path = "m/44'/0'/0'/0/0";
        const child = root.derivePath(path);
        return bitcoin.payments.p2pkh({
          pubkey: child.publicKey,
        }).address;
    }
  }
};
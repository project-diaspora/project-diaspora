import * as Random from 'expo-random';
import { ethers } from 'ethers';
import * as SecureStore from 'expo-secure-store';
import Config from '../../../config';
import Currencies from '../../constants/Currencies';

const bip39 = require('bip39');

const generateMnemonic = async () => {
  const randomBytes = await Random.getRandomBytesAsync(16);
  const b = Buffer.from(randomBytes, 'base64').toString('hex');
  const mnemonic = bip39.entropyToMnemonic(b);
  return SecureStore.setItemAsync('mnemonic', mnemonic);
};

const _deriveWalletAddress = async () => {
  let mnemonic = await SecureStore.getItemAsync('mnemonic');
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
  mnemonic = null;
  await SecureStore.setItemAsync('walletAddress', wallet.address);
  return wallet.address;
};

const getWalletAddress = async () => {
  let walletAddress = await SecureStore.getItemAsync('walletAddress');

  if (!walletAddress) {
    walletAddress = await _deriveWalletAddress();
  }

  return walletAddress;
};

const getStoredMnemonic = async () => await SecureStore.getItemAsync('mnemonic');

const getEthersWallet = async () => {
  const provider = new ethers.providers.InfuraProvider('kovan', 'cbbe19ff896840748997c040127968ff');
  let mnemonic = await SecureStore.getItemAsync('mnemonic');
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
  mnemonic = null;
  return wallet.connect(provider);
};

const getBalance = async () => {
  const provider = new ethers.providers.InfuraProvider('kovan', 'cbbe19ff896840748997c040127968ff');
  const walletAddress = await getWalletAddress();
  const DAIContract = Config.DEV.DAI;
  // const ethBalanceInWei = await provider.getBalance(walletAddress)
  // const ethBalanceInEth = ethers.utils.formatEther(ethBalanceInWei)
  const contractDai = new ethers.Contract(DAIContract.contractAddress, DAIContract.contractAbi, provider);
  const daiBalanceinWei = await contractDai.balanceOf(walletAddress);
  const daiBalanceInDai = Number(ethers.utils.formatEther(daiBalanceinWei)).toFixed(2);
  return daiBalanceInDai;
};

const signDAITransaction = async (amountInDai, toAddress) => {
  const wallet = await getEthersWallet();
  const DAIContract = Config.DEV.DAI;
  const numberOfTokensToSend = ethers.utils.parseUnits(amountInDai, Currencies.DAI.decimals);
  const contract = new ethers.Contract(DAIContract.contractAddress, DAIContract.contractAbi, wallet);

  const options = {
    gasLimit: 150000,
    gasPrice: ethers.utils.parseUnits('10.0', 'gwei')
  };

  const tx = await contract.transfer(toAddress, numberOfTokensToSend, options);
  console.log(tx);
  return tx;
};

export default {
  generateMnemonic,
  getWalletAddress,
  getEthersWallet,
  getStoredMnemonic,
  getBalance,
  signDAITransaction
};

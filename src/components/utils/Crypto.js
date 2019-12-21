import * as Random from 'expo-random';
import { ethers } from 'ethers';
import 'ethers/dist/shims.js';
import Currencies from '../../constants/Currencies'
import * as SecureStore from 'expo-secure-store';

import getEnvVars from '../../../environment';
const env = getEnvVars();

ethers.errors.setLogLevel('error')

const generateMnemonic = async () => {
  const randomBytes = await Random.getRandomBytesAsync(16);
  const mnemonic = ethers.utils.HDNode.entropyToMnemonic(randomBytes)
  return await SecureStore.setItemAsync('mnemonic', mnemonic)
};

const tryMnemonic = async (mnemonicFromUser) => {
  if (ethers.utils.HDNode.isValidMnemonic(mnemonicFromUser)) {
    return await SecureStore.setItemAsync('mnemonic', mnemonicFromUser)
  } else {
    throw 'Invalid mnemonic'
  }
}

const deriveWalletAddress = async () => {
  let mnemonic = await SecureStore.getItemAsync('mnemonic')
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = null
  await SecureStore.setItemAsync('walletAddress', wallet.address)
  return wallet.address
}

const getWalletAddress = async () => {
  let walletAddress = await SecureStore.getItemAsync('walletAddress')

  if (!walletAddress) {
    walletAddress = await deriveWalletAddress()
  }

  return walletAddress
}

const validateAddress = (address) => {
  return ethers.utils.getAddress(address)
}

const getStoredMnemonic = async () => {
  return await SecureStore.getItemAsync('mnemonic')
}

const getEthersWallet = async () => {
  const provider = new ethers.providers.InfuraProvider('kovan', env.infuraKey);
  let mnemonic = await SecureStore.getItemAsync('mnemonic')
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic)
  mnemonic = null
  return wallet.connect(provider)
}

const getBalance = async () => {
  const provider = new ethers.providers.InfuraProvider('kovan', env.infuraKey);
  const walletAddress = await getWalletAddress()
  const DAIContract = env.DAI;
  const contractDai = new ethers.Contract(DAIContract.contractAddress, DAIContract.contractAbi, provider)
  const daiBalanceinWei = await contractDai.balanceOf(walletAddress)
  const daiBalanceInDai = Number(ethers.utils.formatEther(daiBalanceinWei)).toFixed(2)
  return daiBalanceInDai
}

const signDAITransaction = async (amountInDai, toAddress) => {
  const wallet = await getEthersWallet()
  const DAIContract = env.DAI;
  const numberOfTokensToSend = ethers.utils.parseUnits(amountInDai, Currencies.DAI.decimals)
  const contract = new ethers.Contract(DAIContract.contractAddress, DAIContract.contractAbi, wallet)

  var options = {
    gasLimit: 150000,
    gasPrice: ethers.utils.parseUnits('10.0', 'gwei')
  };

  const tx = await contract.transfer(toAddress, numberOfTokensToSend, options)
  return tx
}

const weiToInteger = (amountInWei) => {
  return Number(ethers.utils.formatEther(amountInWei)).toLocaleString(undefined, { maximumFractionDigits: 2 })
}

export default { generateMnemonic, deriveWalletAddress, tryMnemonic, getWalletAddress, getEthersWallet, getStoredMnemonic, getBalance, signDAITransaction, weiToInteger }

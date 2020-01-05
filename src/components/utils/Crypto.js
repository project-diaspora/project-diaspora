import * as Random from 'expo-random';
import { ethers } from 'ethers';
import 'ethers/dist/shims';
import * as SecureStore from 'expo-secure-store';
import Currencies from '../../constants/Currencies';
import getEnvVars from '../../../environment';

const env = getEnvVars();

ethers.errors.setLogLevel('error');

const generateMnemonic = async () => {
  const randomBytes = await Random.getRandomBytesAsync(16);
  const mnemonic = ethers.utils.HDNode.entropyToMnemonic(randomBytes);
  return await SecureStore.setItemAsync('mnemonic', mnemonic);
};

const tryMnemonic = async (mnemonicFromUser) => {
  if (ethers.utils.HDNode.isValidMnemonic(mnemonicFromUser)) {
    return SecureStore.setItemAsync('mnemonic', mnemonicFromUser);
  }
  throw new Error('Invalid mnemonic');
};

const deriveWalletAddress = async () => {
  let mnemonic = await SecureStore.getItemAsync('mnemonic');
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
  mnemonic = null;
  await SecureStore.setItemAsync('walletAddress', wallet.address);
  return wallet.address;
};

const getWalletAddress = async () => {
  let walletAddress = await SecureStore.getItemAsync('walletAddress');

  if (!walletAddress) {
    walletAddress = await deriveWalletAddress();
  }

  return walletAddress;
};

/**
 * Returns ?
 * @param address
 * @returns {string}
 */
const validateAddress = (address) => ethers.utils.getAddress(address);

const getStoredMnemonic = async () => SecureStore.getItemAsync('mnemonic');

const getEthersWallet = async () => {
  const provider = new ethers.providers.InfuraProvider('kovan', env.infuraKey);
  let mnemonic = await SecureStore.getItemAsync('mnemonic');
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
  mnemonic = null;
  return wallet.connect(provider);
};

const getBalance = async () => {
  const provider = new ethers.providers.InfuraProvider('kovan', env.infuraKey);
  const walletAddress = await getWalletAddress();
  const contractDai = new ethers.Contract(env.DAI.contractAddress, env.DAI.contractAbi, provider);
  const daiBalanceinWei = await contractDai.balanceOf(walletAddress);
  return daiBalanceinWei;
};

const signDAITransaction = async (amountInDai, toAddress) => {
  const wallet = await getEthersWallet();
  const numberOfTokensToSend = ethers.utils.parseUnits(amountInDai, Currencies.DAI.decimals);
  const contract = new ethers.Contract(env.DAI.contractAddress, env.DAI.contractAbi, wallet);

  const options = {
    gasLimit: 200000,
    gasPrice: ethers.utils.parseUnits('10.0', 'gwei')
  };

  try {
    const tx = await contract.transfer(toAddress, numberOfTokensToSend, options);
    await tx.wait();
    return tx;
  } catch (error) {
    throw error;
  }
};

const signMessage = async (message) => {
  const wallet = await getEthersWallet();
  return wallet.signMessage(message);
};

const verifyMessage = async (message, signature) => ethers.utils.verifyMessage(message, signature);

const weiToInteger = (amountInWei) => formatToCurrency(Number(ethers.utils.formatEther(amountInWei)));

const integertoWei = (amountInInteger) => ethers.utils.parseEther(amountInInteger).toString(10);

const formatToCurrency = (number) => Number(number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default {
  generateMnemonic,
  deriveWalletAddress,
  tryMnemonic,
  getWalletAddress,
  validateAddress,
  getEthersWallet,
  getStoredMnemonic,
  getBalance,
  signDAITransaction,
  weiToInteger,
  integertoWei,
  formatToCurrency,
  signMessage,
  verifyMessage
};

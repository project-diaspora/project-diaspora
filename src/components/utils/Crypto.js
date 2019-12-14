import * as Random from 'expo-random';
const bip39 = require('bip39');
import { ethers } from 'ethers';
import Config from '../../../config'
import Currencies from '../../constants/Currencies'
import * as SecureStore from 'expo-secure-store';

const generateMnemonic = async () => {
  const randomBytes = await Random.getRandomBytesAsync(16);
  let b = Buffer.from(randomBytes, 'base64').toString('hex');
  return bip39.entropyToMnemonic(b);
};

const getWalletAddress = async (currency) => {
  switch (currency) {
    case 'ETH':
      const ethWallet = await getEthersWallet()
      return ethWallet.address
  }
};

const getStoredMnemonic = async () => {
  const authObjectString = await SecureStore.getItemAsync('authObject')
  const authObject = JSON.parse(authObjectString)
  return authObject.mnemonic
}

const getEthersWallet = async () => {
  const provider = new ethers.providers.InfuraProvider('kovan', 'cbbe19ff896840748997c040127968ff');
  const mnemonic = await getStoredMnemonic()
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic)
  return wallet.connect(provider)
}

const getBalance = async () => {
  const provider = new ethers.providers.InfuraProvider('kovan', 'cbbe19ff896840748997c040127968ff');
  const walletAddress = await getWalletAddress('ETH')
  const DAIContract = Config['DEV'].DAI;
  // const ethBalanceInWei = await provider.getBalance(walletAddress)
  // const ethBalanceInEth = ethers.utils.formatEther(ethBalanceInWei)
  const contractDai = new ethers.Contract(DAIContract.contractAddress, DAIContract.contractAbi, provider)
  const daiBalanceinWei = await contractDai.balanceOf(walletAddress)
  const daiBalanceInDai = Number(ethers.utils.formatEther(daiBalanceinWei)).toFixed(2)
  return daiBalanceInDai
}

const signDAITransaction = async (amountInDai, toAddress) => {
  const wallet = await getEthersWallet()
  const DAIContract = Config['DEV'].DAI;
  const numberOfTokensToSend = ethers.utils.parseUnits(amountInDai, Currencies.DAI.decimals)
  const contract = new ethers.Contract(DAIContract.contractAddress, DAIContract.contractAbi, wallet)

  var options = {
    gasLimit: 150000,
    gasPrice: ethers.utils.parseUnits('10.0', 'gwei')
  };

  const tx = await contract.transfer(toAddress, numberOfTokensToSend, options)
  console.log(tx)
  return tx
}

export default { generateMnemonic, getWalletAddress, getStoredMnemonic, getEthersWallet, getBalance, signDAITransaction }

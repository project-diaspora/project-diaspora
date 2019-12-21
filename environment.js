import Constants from 'expo-constants';
import { Platform } from 'react-native';

const localhost =
  Platform.OS === 'ios' ? 'localhost:8080' : '10.0.2.2:8080';

const ENV = {
  dev: {
    apiUrl: localhost,
    infuraKey: 'cbbe19ff896840748997c040127968ff',
    etherscanKey: 'YourApiKeyToken',
    etherscanUrl: 'https://api-kovan.etherscan.io',
    DAI: {
      contractAddress: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      contractAbi: [{
        constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'bytes32' }], payable: false, stateMutability: 'view', type: 'function'
      }, {
        constant: true, inputs: [{ name: 'src', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function'
      }, {
        constant: false, inputs: [{ name: 'dst', type: 'address' }, { name: 'wad', type: 'uint256' }], name: 'transfer', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function'
      }]
    }
  },
  staging: {
    apiUrl: '[staging.api.here]',
    infuraKey: 'cbbe19ff896840748997c040127968ff',
    etherscanKey: 'YourApiKeyToken',
    etherscanUrl: 'https://api-kovan.etherscan.io',
    DAI: {
      contractAddress: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      contractAbi: [{
        constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'bytes32' }], payable: false, stateMutability: 'view', type: 'function'
      }, {
        constant: true, inputs: [{ name: 'src', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function'
      }, {
        constant: false, inputs: [{ name: 'dst', type: 'address' }, { name: 'wad', type: 'uint256' }], name: 'transfer', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function'
      }]
    },
  },
  prod: {
    apiUrl: '[production.api.here]',
    infuraKey: '[Enter your key here]',
    etherscanKey: 'YourApiKeyToken',
    etherscanUrl: 'https://api.etherscan.io',
    DAI: {
      contractAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
      contractAbi: [{
        constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'bytes32' }], payable: false, stateMutability: 'view', type: 'function'
      }, {
        constant: true, inputs: [{ name: 'src', type: 'address' }], name: 'balanceOf', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function'
      }, {
        constant: false, inputs: [{ name: 'dst', type: 'address' }, { name: 'wad', type: 'uint256' }], name: 'transfer', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function'
      }]
    },
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;

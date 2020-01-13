import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'https://staging.massari.app',
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
    apiUrl: 'https://staging.massari.app',
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
  production: {
    apiUrl: 'https://massari.app',
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
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__ || !env) {
    return ENV.dev;
  }
  if (env === 'staging') {
    return ENV.staging;
  }
  if (env === 'production') {
    return ENV.production;
  }
  return ENV.dev;
};

export default getEnvVars;

import createDataContext from './createDataContext';
import etherscanApi from '../api/etherscan';
import api from '../api/backend';
import getEnvVars from '../../environment';

const env = getEnvVars();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'get_transactions':
      return { transactions: action.payload };
    default:
      return state;
  }
};

const getEthereumTransactions = async (walletAddress) => {
  try {
    const response = await etherscanApi.get(`/api?module=account&action=tokentx&contractaddress=${env.DAI.contractAddress}&address=${walletAddress}&sort=desc&apikey=${env.etherscanKey}`);
    const txData = response.data.result.map((txObject) => {
      if (txObject.to.toLowerCase() === walletAddress.toLowerCase()) { // toLowerCase() because Ethereum addresses exist in either lowercase or checksum format (a mix of upper and lowercase)
        txObject.type = 'credit';
      } else if (txObject.from.toLowerCase() === walletAddress.toLowerCase()) {
        txObject.type = 'debit';
      }
      return txObject;
    });
  } catch (err) {
    console.log(err);
  }
};

const mergeTxs = (ethereumTxs, massariTxs) => {
  console.log(JSON.stringify(ethereumTxs));
  const key = 'hash'
  const array = [];
  const groups = new Map(); // key => [pos in array, [array, of, objects, with, the, same, key]]

  for (let i = 1; i < arguments.length; ++i) {
    for (let j = 0; j < arguments[i].length; ++j) {
      const element = arguments[i][j];
      if (element.hasOwnProperty(key)) {
        const keyValue = element[key];
        if (groups.has(keyValue)) {
          groups.get(keyValue)[1].push(element);
        } else {
          array.push(element);
          groups.set(keyValue, [array.length - 1, []]);
        }
      } else {
        array.push(element);
      }
    }
  }

  for (let group of groups) {
    if (group[1][1].length === 0)
      continue;
    array[group[1][0]] =
      Object.assign.apply(Object, [{}, array[group[1][0]]].concat(group[1][1]));
  }

  return array;

};

const getTransactions = (dispatch) => async (walletAddress) => {
  const ethereumTxs = await getEthereumTransactions(walletAddress);
  // const massariTxs = await api.createUser(username);
  dispatch({ type: 'get_transactions', payload: txData });
  return mergeTxs(ethereumTxs, massariTxs);
};

export const { Provider, Context } = createDataContext(
  transactionReducer,
  { getTransactions },
  { transactions: [] }
);

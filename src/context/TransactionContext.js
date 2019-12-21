import createDataContext from './createDataContext';
import etherscanApi from '../api/etherscan';

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

const getTransactions = (dispatch) => async (walletAddress) => {
  try {
    const response = await etherscanApi.get(`/api?module=account&action=tokentx&contractaddress=${env.DAI.contractAddress}&address=${walletAddress}&sort=desc&apikey=${env.etherscanKey}`);
    const txData = response.data.result.map(txObject => {
      if (txObject.to.toLowerCase() === walletAddress.toLowerCase()) { // toLowerCase() because Ethereum addresses exist in either lowercase or checksum format (a mix of upper and lowercase)
        txObject.type = 'credit'
      } else if (txObject.from.toLowerCase() === walletAddress.toLowerCase()) {
        txObject.type = 'debit'
      }
      return txObject
    })
    dispatch({ type: 'get_transactions', payload: txData });
  } catch (err) {
    console.log(err);
  }
};

export const { Provider, Context } = createDataContext(
  transactionReducer,
  { getTransactions },
  { transactions: [] }
);

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
    return txData;
  } catch (err) {
    console.log(err);
  }
};

const mergeTxs = (ethereumTxs, massariTxs) => {

};

const getTransactions = (dispatch) => async (walletAddress) => {
  const ethereumTxs = await getEthereumTransactions(walletAddress);
  const massariTxs = await api.getTransactions();
  dispatch({ type: 'get_transactions', payload: mergeTxs(ethereumTxs, massariTxs) });
  return;
};

export const { Provider, Context } = createDataContext(
  transactionReducer,
  { getTransactions },
  { transactions: [] }
);

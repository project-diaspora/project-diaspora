import createDataContext from "./createDataContext";
import etherScanApi from '../api/etherScan'
import Config from '../../config'

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'get_transactions':
      return {transactions: action.payload};
    default:
      return state
  }
};

const getTransactions = dispatch => async (walletAddress) => {
  try {
    const response = await etherScanApi.get(`/api?module=account&action=tokentx&contractaddress=${Config['DEV'].DAI.contractAddress}&address=${walletAddress}&sort=asc&apikey=YourApiKeyToken`)
    // console.log(response.data.result)
    dispatch({type: 'get_transactions', payload: response.data.result})
  } catch (err) {
    console.log(err)
  }
};

export const {Provider, Context} = createDataContext(
  transactionReducer,
  {getTransactions},
  {transactions: []}
);

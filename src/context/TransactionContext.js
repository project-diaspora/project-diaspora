import createDataContext from "./createDataContext";
import etherScanApi from '../api/etherScan'

const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'get_transactions':
      return {transactions: action.payload};
    default:
      return state
  }
};

const getTransactions = dispatch => async () => {
  try {
    const response = await etherScanApi.get("/api?module=account&action=tokentx&contractaddress=0x6b175474e89094c44da98b954eedeac495271d0f&address=0x4e83362442b8d1bec281594cea3050c8eb01311c&page=1&offset=100&sort=asc&apikey=YourApiKeyToken")
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

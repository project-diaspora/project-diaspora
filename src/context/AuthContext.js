import createDataContext from "./createDataContext";
// import trackerApi from '../api/tracker'
import {navigate} from "../navigationRef";
import Crypto from "../components/utils/Crypto";
import * as SecureStore from 'expo-secure-store';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload}
    case 'signin':
      return {errorMessage: '', username: action.payload.username, address: action.payload.address}
    case 'signout':
      return {errorMessage: '', token: null}
    case 'clear_error_message':
      return {...state, errorMessage: ''}
    default:
      return state
  }
}

const tryLocalSignin = dispatch => async () => {

  const authObject = await SecureStore.getItemAsync('authObject');
  console.log(authObject);

  if (authObject) {
    dispatch({type: 'signin', payload: authObject})
    navigate('mainFlow')
  } else {
    navigate('loginFlow')
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'})
}

const signup = (dispatch) => async ({username: username}) => {
  try {
    // const mnemonic = await Crypto.generateMnemonic()
    const mnemonic = 'belt year volcano since fire code vast gap usual market power save'
    const authObject = JSON.stringify({
      username: username,
      mnemonic
    });
    await SecureStore.setItemAsync('authObject', authObject);
    dispatch({type: 'signin', payload: {username: username, address: mnemonic}})
    navigate('mainFlow')
  } catch (err) {
    dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
  }
}


const signin = (dispatch) => async ({email: email, password: password}) => {
  // TODO: FIX ME
  // try {
  //   const response = await trackerApi.post('/signin', {email, password})
  //   await AsyncStorage.setItem('token', response.data.token)
  //   dispatch({type: 'signin', payload: response.data.token})
  //   navigate('TrackList')
  // } catch (err) {
  //   dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
  // }
}


const signout = () => async () => {
  try {
    console.log('signout')
    await SecureStore.deleteItemAsync('authObject')
    navigate('loginFlow')
  } catch (err) {

  }

};


export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, clearErrorMessage, tryLocalSignin},
  {username: null, address: null, errorMessage: ''}
)



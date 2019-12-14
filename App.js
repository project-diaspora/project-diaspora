// Core
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import './shim.js';
import {setNavigator} from "./src/navigationRef";

// Providers
import {Provider as AuthProvider} from "./src/context/AuthContext";

// Screens
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import AuthLandingScreen from "./src/screens/AuthLanding";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import RecoveryPhraseScreen from "./src/screens/RecoveryPhrase";
import AddMoneyScreen from "./src/screens/AddMoneyScreen";
import SendMoneyScreen from "./src/screens/SendMoneyScreenl";
import AddCryptoScreen from "./src/screens/AddCryptoScreen";


const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    AuthLanding: AuthLandingScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen
  }),
  mainFlow: createBottomTabNavigator({
    homeFlow: createStackNavigator({
      Home: HomeScreen,
      AddMoney: AddMoneyScreen,
      SendMoney: SendMoneyScreen,
      AddCrypto: AddCryptoScreen
    }),
    settingsFlow: createStackNavigator({
      Settings: SettingsScreen,
      RecoveryPhrase: RecoveryPhraseScreen
    })
  })
});

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => {
        setNavigator(navigator)
      }}/>
    </AuthProvider>
  )
}

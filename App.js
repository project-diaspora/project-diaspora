// Core
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import './shim.js';
import { setNavigator } from "./src/navigationRef";

// Providers
import { Provider as AuthProvider } from "./src/context/AuthContext";

// Screens
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import AuthLandingScreen from "./src/screens/AuthLanding";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import RecoveryPhraseScreen from "./src/screens/RecoveryPhraseScreen";
import AddMoneyScreen from "./src/screens/AddMoneyScreen";
import SelectAmountScreen from "./src/screens/SelectAmountScreen";
import SelectContactScreen from "./src/screens/SelectContactScreen";
import ConfirmTransactionScreen from "./src/screens/ConfirmTransactionScreen";
import AddCryptoScreen from "./src/screens/AddCryptoScreen";

import TabBarIcon from './src/components/TabBarIcon';
import Colors from './src/constants/Colors';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    AuthLanding: AuthLandingScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen
  }),
  mainFlow: createStackNavigator({
    homeFlow: createBottomTabNavigator({
      Wallets: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarLabel: 'Accounts',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-wallet' : 'md-wallet'} />
          ),
        }
      },
      Pay: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarLabel: 'Pay',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-paper-plane' : 'md-paper-plane'} />
          ),
        }
      },
      settingsFlow: createStackNavigator({
        Settings: {
          screen: SettingsScreen,
          navigationOptions: {
            headerStyle: {
              shadowColor: 'transparent',
              elevation: 0,
              borderBottomWidth: 0,
              backgroundColor: Colors.green,
            },
            headerBackTitle: 'Settings',
          },
        },
        RecoveryPhrase: RecoveryPhraseScreen
      }, {
        mode: 'card',
        navigationOptions: {
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
          ),
        }
      }),

    }, {
      initialRouteName: 'Pay',
      tabBarOptions: {
        activeTintColor: Colors.green,
        style: {
          paddingHorizontal: 50
        }
      },
    }),
    sendMoneyFlow: createStackNavigator({
      SelectAmount: SelectAmountScreen,
      SelectContact: SelectContactScreen,
      ConfirmTransaction: ConfirmTransactionScreen
    }, {
      mode: 'card',
    }),
    AddMoneyFlow: createStackNavigator({
      AddMoney: AddMoneyScreen,
      AddCrypto: AddCryptoScreen
    }, {
      mode: 'card',
    })
  }, {
    mode: 'modal',
    headerMode: 'none'
  }),
});

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => {
        setNavigator(navigator)
      }} />
    </AuthProvider>
  )
}

// Core
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform, StatusBar } from 'react-native';
import { setNavigator } from './src/navigationRef';
import { registerRootComponent } from 'expo';

// Providers
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as TransactionProvider } from './src/context/TransactionContext';

// Screens
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AuthLandingScreen from './src/screens/AuthLanding';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import RecoveryPhraseScreen from './src/screens/RecoveryPhraseScreen';
import AddMoneyScreen from './src/screens/AddMoneyScreen';
import SelectAmountScreen from './src/screens/SelectAmountScreen';
import SelectContactScreen from './src/screens/SelectContactScreen';
import ConfirmTransactionScreen from './src/screens/ConfirmTransactionScreen';
import AddCryptoScreen from './src/screens/AddCryptoScreen';
import AddCardScreen from './src/screens/AddCardScreen';
import SupportScreen from './src/screens/SupportScreen';

import TabBarIcon from './src/components/TabBarIcon';
import Colors from './src/constants/Colors';

import { useScreens } from 'react-native-screens';
useScreens();

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    AuthLanding: AuthLandingScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
  }),
  Onboarding: OnboardingScreen,
  mainFlow: createStackNavigator({
    homeFlow: createBottomTabNavigator({
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-wallet' : 'md-wallet'} />
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
        RecoveryPhrase: RecoveryPhraseScreen,
        Support: SupportScreen,
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
      AddCard: AddCardScreen,
      AddCrypto: AddCryptoScreen
    }, {
      mode: 'card',
    })
  }, {
    mode: 'modal',
    headerMode: 'none'
  }),
});

const App = createAppContainer(switchNavigator);

export default () => (
  <AuthProvider>
    <TransactionProvider>
      <StatusBar barStyle="dark-content" />
      <App ref={(navigator) => {
        setNavigator(navigator);
      }}
      />
    </TransactionProvider>
  </AuthProvider>
);

registerRootComponent(App);
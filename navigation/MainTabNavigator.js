import React from 'react';
import { Platform, Button, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SelectAmountModal from '../screens/SelectAmountModal'
import SendModal from '../screens/SendModal'
import AddCrypto from '../screens/addMoney/AddCrypto'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Wallet',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-wallet'
          : 'md-wallet'
      }
    />
  ),
};

HomeStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SettingsStack,
}, {
  tabBarOptions: {
    activeTintColor: 'green',
    style: {
      paddingHorizontal: 50
    }
  }
});

tabNavigator.path = '';

const AddMoneyStack = createStackNavigator(
  {
    SelectAmountStack: SelectAmountModal,
    AddCrypto: AddCrypto,
  }, {
    mode: 'card',
    initialRouteName: 'SelectAmountStack'
  }
);

const SendStack = createStackNavigator(
  {
    SendModal: SendModal,
  }, {
    mode: 'card',
    initialRouteName: 'SendModal'
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: tabNavigator,
    },
    AddMoney: {
      screen: AddMoneyStack,
    },
    Send: {
      screen: SendStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export default RootStack;

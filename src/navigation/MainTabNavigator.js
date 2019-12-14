// import React from 'react';
// import { Platform } from 'react-native';
// import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
//
// import TabBarIcon from '../components/TabBarIcon';
// import Colors from '../constants/Colors';
//
// import Wallet from '../screens/Wallet';
// import AddMoney from '../screens/AddMoney'
// import SendModal from '../screens/SendModal'
// import AddCrypto from '../screens/addMoney/AddCrypto'
//
// import Settings from '../screens/Settings';
// import RecoveryPhrase from '../screens/settings/RecoveryPhrase'
//
// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });
//
// const HomeStack = createStackNavigator(
//   {
//     Home: Wallet,
//   },
//   config
// );
//
// HomeStack.navigationOptions = {
//   tabBarLabel: 'Wallet',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? 'ios-wallet'
//           : 'md-wallet'
//       }
//     />
//   ),
// };
//
// HomeStack.path = '';
//
// const SettingsStack = createStackNavigator(
//   {
//     Settings,
//     RecoveryPhrase,
//   }, {
//     mode: 'card',
//     initialRouteName: 'Settings',
//   }
// );
//
// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
//   ),
// };
//
// SettingsStack.path = '';
//
// const tabNavigator = createBottomTabNavigator({
//   HomeStack,
//   SettingsStack,
// },{
//   tabBarOptions: {
//     activeTintColor: Colors.green,
//     style: {
//       paddingHorizontal: 50
//     }
//   }
// });
//
// tabNavigator.path = '';
//
// const AddMoneyStack = createStackNavigator(
//   {
//     SelectAmountStack: AddMoney,
//     AddCrypto: AddCrypto,
//   }, {
//     mode: 'card',
//     initialRouteName: 'SelectAmountStack'
//   }
// );
//
// const SendStack = createStackNavigator(
//   {
//     SendModal: SendModal,
//   }, {
//     mode: 'card',
//     initialRouteName: 'SendModal'
//   }
// );
//
// const RootStack = createStackNavigator(
//   {
//     Main: {
//       screen: tabNavigator,
//     },
//     AddMoney: {
//       screen: AddMoneyStack,
//     },
//     Send: {
//       screen: SendStack,
//     },
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none'
//   }
// );
//
// export default RootStack;

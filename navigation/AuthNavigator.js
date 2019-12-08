import React from 'react';
import { createStackNavigator } from 'react-navigation';

import AuthLanding from '../screens/AuthLanding'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'

export default AuthStack = createStackNavigator(
  {
    AuthLanding: {
      screen: AuthLanding,
    },
    SignUp: {
      screen: SignUp,
    },
    SignIn: {
      screen: SignIn,
    },
  },
  {
    mode: 'card',
  }
);

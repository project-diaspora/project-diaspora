import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignin();
  }, []);
  return null;
};

export default ResolveAuthScreen;

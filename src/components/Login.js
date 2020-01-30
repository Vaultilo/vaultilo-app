import React, { useEffect } from 'react';
import { useBlockstack } from 'react-blockstack';
import Loader from './Loader';

export default function Login() {
  const { signIn } = useBlockstack();
  useEffect(() => {
    signIn();
  }, []);
  return <Loader />;
}

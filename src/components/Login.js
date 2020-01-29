import React, { useEffect } from "react";
import { useBlockstack } from "react-blockstack";

export default function Login() {
  const { signIn } = useBlockstack();
  useEffect(() => {
    signIn();
  }, []);
  return (
    <div>
      Logging In...
    </div>
  ); 
}

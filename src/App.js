import React from "react";
import { useBlockstack } from "react-blockstack";
import Landing from "./components/Landing.js";
import AppRouter from './components/AppRouter.js';

export default function App() {
  const { person, signIn } = useBlockstack();
  return (
    <>
      {signIn && <Landing />}
      {person && <AppRouter person={person} />}
    </> 
  );
}

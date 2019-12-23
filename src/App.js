import React from "react";
import { useBlockstack } from "react-blockstack";
import Content from "./components/Content.js";
import Landing from "./components/Landing.js";

export default function App() {
  const { person, signIn } = useBlockstack();
  return (
    <>
      {signIn && <Landing />}
      {person && <Content person={person} />}
    </>
  );
}

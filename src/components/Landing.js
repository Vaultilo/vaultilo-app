import React from "react";
import { BlockstackButton } from "react-blockstack-button";
import { useBlockstack } from "react-blockstack";

export default function Landing() {
  const { signIn } = useBlockstack();
  return (
    <>
      <nav class="navbar fixed-top navbar-dark bg-dark text-light">
        <a class="navbar-brand" href="/" href="#">
          Home
        </a>
      </nav>
      <div className="Landing vh-100 d-flex align-items-center">
        <div className="container">
          <div className="panel-landing text-center py-5">
            <h1 className="landing-heading">Password Manager</h1>
            <p className="lead">
              Secure your crypto wallets and credentials with decentralised
              technology
            </p>
            <BlockstackButton variant={'light'} onClick={signIn} />
          </div>
        </div>
      </div>
    </>
  );
}

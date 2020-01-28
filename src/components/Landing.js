import React from "react"; 
import { BlockstackButton } from "react-blockstack-button";
import { useBlockstack } from "react-blockstack";
import "./Landing.css";

export default function Landing() {
  const { signIn } = useBlockstack();
  return (
    <div className="container">
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <img src="/images/logo-green.svg" al="Logo"/>
        </a>
      </nav>
      {/* <div className="Landing vh-100 d-flex align-items-center">
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
      </div> */}
      <div className="w-100 d-flex">
        <div className="landing-info">
          <div className="landing-text text-uppercase">
            <span className="color-primary">Secure</span> your crypto wallets and credentials with decentralised
            technology
          </div>
          <div className="separator-img">
            <img src="/images/dumb-bell.svg" alt="" />
          </div>
          <div className="landing-sub-test">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          </div>
          <button className="login-btn" onClick={signIn}>
            <img src="/images/login-btn-img.svg" alt="Login with blockstack"/>
          </button>
        </div>
        <div className="landing-img">
          <img src="/images/landing-img.svg" />
        </div>
      </div>
    </div>
  );
}

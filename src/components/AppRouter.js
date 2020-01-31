import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Content from './Content';
import ExtLanding from './ExtLanding';
import { useBlockstack } from 'react-blockstack';
import Login from './Login';
import { UserSession } from 'blockstack';
import Loader from './Loader';

export default function AppRouter() {
  const { person, signOut } = useBlockstack();
  const isSigninPending = new UserSession().isSignInPending();
  const isSignedIn = new UserSession().isUserSignedIn();
  return isSigninPending ? <Loader/> : (
    <Switch>
      <Route
        exact={true}
        path="/login"
        render={routeProps => {
          return !person ? <Login {...routeProps} /> : <Redirect to="/items/all" />;
        }}
      />
      <Route
        exact={true}
        path="/"
        render={() => {
          return isSignedIn ? <Redirect to="/items/all" /> : <Redirect to="/login"/>;
        }}
      />
      <Route
        path="/extension/view"
        exact={true}
        render={routeProps => {
          return !person ? (
            <ExtLanding {...routeProps} />
          ) : (
            <Content {...routeProps} person={person} />
          );
        }}
      />
      <Route
        path="/:type/:subType"
        render={routeProps => {
          if (person) {
            return <Content {...routeProps} person={person} />;
          } else {
            window.location.assign('https://vaultilo.com');
          }
        }}
      />
    </Switch>
  );
}

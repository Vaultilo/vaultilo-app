import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Content from "./Content";
import ExtLanding from "./ExtLanding";
import { useBlockstack } from "react-blockstack";
import Login from "./Login";

export default function AppRouter() {
  const { person, signOut } = useBlockstack();
  return (
    <Switch>
      <Route
        exact={true}
        path="/login"
        render={routeProps => {
          return !person ? (
            <Login {...routeProps} />
          ) : (
            <Redirect to="/items/all" />
          );
        }}
      />
      <Route
        exact={true}
        path="/"
        render={() => {
          return <Redirect to="/items/all" />
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
        render={(routeProps) => {
          // if (!person) {
          //   window.location.assign("https://vaultilo.madoveradvertising.com/");
          // }
          if(person) {
            return <Content {...routeProps} person={person} />
          } else if( person === null ) {
            window.location.assign("https://vaultilo.madoveradvertising.com/");
          }
        }}
      />
    </Switch>
  );
}

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Content from "./Content"; 
import Landing from "./Landing";
import { useBlockstack } from "react-blockstack";

export default function AppRouter() {
  const { person } = useBlockstack();
  return (
    <Switch>
      <Route
        exact={true}
        path="/"
        render={(routeProps) => {
        return !person ? <Landing {...routeProps}/> : <Redirect to="/items/all" />}} 
      />
      <Route path="/:type/:subType" render={
        (routeProps) => {
            return !person ? <Landing {...routeProps}/> : <Content {...routeProps} person={person} />
          }
        } />
    </Switch>
  ); 
}

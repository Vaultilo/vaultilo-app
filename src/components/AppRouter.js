import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainContent from "./MainContent";

export default function AppRouter(props) {
  return (
    <Switch>
      <Route
        exact={true}
        path="/"
        render={() => <Redirect to="/items/all" />}
      />
      <Route path="/:type/:subType" render={(routeProps) => <MainContent {...routeProps} {...props} />} />
    </Switch>
  ); 
}

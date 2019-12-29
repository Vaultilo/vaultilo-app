import React from "react";
import { Switch, Route } from "react-router-dom";
import MainContent from "./MainContent";

export default function AppRouter(props) {
  return (
    <Switch>
      <Route path="/:type/:subType" render={(routeProps) => <MainContent {...routeProps} {...props} />} />
    </Switch>
  ); 
}

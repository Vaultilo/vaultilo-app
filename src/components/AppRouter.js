import React from "react";
import { Switch, Route } from "react-router-dom";
import MainContent from "./MainContent";
import Dashboard from "./Dashboard";
import Form from "./Form";

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/:walletPath" component={MainContent} />
      <Route path="/:walletPath/:wallet" component={Form} />
    </Switch>
  );
}

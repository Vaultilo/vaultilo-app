import React from "react";
import { Switch, Route } from "react-router-dom";
import MainContent from "./MainContent";

export default function AppRouter(props) {
  const { credentials, setCredentials } = props;
  return (
    <Switch>
      <Route path="/crypto/:type" render={(props) => <MainContent {...props} credentials={credentials} setCredentials={setCredentials} />} />
    </Switch>
  );
}

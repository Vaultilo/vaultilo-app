import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Content from "./Content"; 

export default function AppRouter(props) {
  return (
    <Switch>
      <Route
        exact={true}
        path="/"
        render={() => <Redirect to="/items/all" />} 
      />
      <Route path="/:type/:subType" render={(routeProps) => <Content {...routeProps} {...props} />} />
    </Switch>
  ); 
}

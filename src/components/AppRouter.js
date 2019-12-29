import React from "react";
import { Switch, Route } from "react-router-dom";
import MainContent from "./MainContent";
import Card from './Card.js';

export default function AppRouter(props) {
  return (
    <Switch>
      <Route exact path="/card" component={Card} />
      <Route path="/:type/:subType" render={(routeProps) => <MainContent {...routeProps} {...props} />} />
    </Switch>
  ); 
}

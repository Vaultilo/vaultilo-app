import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainContent from './MainContent';
import Dashboard from './Dashboard';
import Form from './Form';

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route
        exact
        path="/:walletPath"
        render={(props) => <MainContent {...props} />}
      />
      {/* <Route exact path="/ethereum" render={(props) => <MainContent {...props} walletPath={'ethereum'} />} /> */}
      <Route path="/:walletPath/new" render={(props) => <Form {...props} />} />
      {/* <Route path="/ethereum/new" render={(props) => <Form {...props} walletPath={'ethereum'} />} /> */}
    </Switch>
  );
}

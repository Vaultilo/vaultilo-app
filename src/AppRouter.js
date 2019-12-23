import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import Dashboard from './components/Dashboard';
import Form from './components/Form';

export default function AppRouter () {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/icon" render={(props) => <MainContent {...props} walletPath={'icon'} />} />
      <Route exact path="/ethereum" render={(props) => <MainContent {...props} walletPath={'ethereum'} />} />
      <Route path="/icon/new" render={(props) => <Form {...props} walletPath={'icon'} />} />
      <Route path="/ethereum/new" render={(props) => <Form {...props} walletPath={'ethereum'} />} />
    </Switch>
  );
};

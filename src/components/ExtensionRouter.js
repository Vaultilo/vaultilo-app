import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Extension from './ExtensionRoute/Extension'
import ExtPwShow from './ExtensionRoute/ExtPwShow'
import ExtNoteShow from './ExtensionRoute/ExtNoteShow'
import ExtCryptoShow from './ExtensionRoute/ExtCryptoShow'

export default function ExtensionRouter(props) {
  return (
    <Switch>
      <Route 
          exact={true}
          path="/extension/view"
          render={()=><Extension {...props}/>}
        />
        <Route 
          exact={true}
          path="/extension/passwords"
          render={()=><ExtPwShow {...props}/>}
        />

        <Route 
          exact={true}
          path="/extension/notes"
          render={()=><ExtNoteShow {...props}/>}
        />

        <Route
          exact={true}
          path="/extension/crypto/:subType"
          render ={(subType)=><ExtCryptoShow {...props}{...subType}/>}
        />

    </Switch>
  ); 
}

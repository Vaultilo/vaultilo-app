import React from "react";
import { Switch, Route} from "react-router-dom";
import Extension from './Extension/Extension'
import ExtPwShow from './Extension/ExtPwShow'
import ExtNoteShow from './Extension/ExtNoteShow'
import ExtCryptoShow from './Extension/ExtCryptoShow'
import ExtNftShow  from './Extension/ExtNftShow'
import '../styles/icons.css'

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
          path="/extension/crypto/"
          render ={(subType)=><ExtCryptoShow {...props}{...subType}/>}
        />
      <Route
          exact={true}
          path="/extension/nft/"
          render ={(subType)=><ExtNftShow {...props}{...subType}/>}
      />

    </Switch>
  ); 
}

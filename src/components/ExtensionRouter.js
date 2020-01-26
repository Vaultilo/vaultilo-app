import React from "react";
import { Switch, Route} from "react-router-dom";
import Extension from './Extension/Extension'
import ExtPwShow from './Extension/ExtPwShow'
import ExtNoteShow from './Extension/ExtNoteShow'
import ExtCryptoShow from './Extension/ExtCryptoShow'
import ExtNftShow  from './Extension/ExtNftShow'
import CryptoDetail from './Extension/CryptoDetail';
import PasswordDetail from './Extension/PasswordDetail';
import NotesDetail from './Extension/NotesDetail'
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
          path="/extension/crypto"
          render ={()=><ExtCryptoShow {...props}/>}
        />
      <Route
          exact={true}
          path="/extension/nft"
          render ={()=><ExtNftShow {...props} />}
      />
      <Route
        path="/extension/crypto/view"
        render ={()=><CryptoDetail {...props} />}
      />

      <Route 
        path="/extension/password/view"
        render ={()=><PasswordDetail {...props}/>}
      />

      <Route 
        path="/extension/notes/view"
        render ={()=><NotesDetail {...props}/>}
      />
    </Switch>
  ); 
}

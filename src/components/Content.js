import React, {useState} from 'react';
import TopBar from './TopBar.js';
import MainContent from './MainContent.js';
import SideBar from './Sidebar.js';
import { useFile } from "react-blockstack"; 
import ExtensionRouter from "./ExtensionRouter"

export default function Content ( props ) {
  const { person } = props;
  const [credentials, setCredentials] = useFile('crypto.json');
  const [passwords, setPasswords] = useFile('passwords.json');
  const [notes, setNotes] = useFile('notes.json');
  
  const [searchText, setSearchText] = useState('');

  const avatarUrl = person.avatarUrl() || 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

  const credentialsArray = credentials ? JSON.parse(credentials) : [];
  const notesArray = notes ? JSON.parse(notes) : [];
  const passwordsArray = passwords ? JSON.parse(passwords) : [];
  const name = person.name() || 'User';
  const extensionView=(window.location.pathname.includes("extension"));
  return credentials === undefined || passwords === undefined || notes === undefined ? (<div>Loading..</div>):(
    extensionView ? <ExtensionRouter
            credentials={credentialsArray}
            setCredentials={setCredentials}
            passwords={passwordsArray}
            setPasswords={setPasswords}
            notes={notesArray}
            setNotes={setNotes}
            {...props}
    /> :

    <main>
      <div className="d-flex vh-100">
        <div className="side-content">
          <SideBar credentials={credentialsArray} {...props} />
        </div>
        <div className="main-content">
          <TopBar avatarUrl={avatarUrl} name={name} searchText={searchText} setSearchText={(text) => setSearchText(text)} />
          <MainContent 
            credentials={credentialsArray}
            setCredentials={setCredentials}
            passwords={passwordsArray}
            setPasswords={setPasswords}
            notes={notesArray}
            setNotes={setNotes}
            searchText={searchText}
            {...props}
          />
        </div>
      </div>      
    </main> 
  )
}
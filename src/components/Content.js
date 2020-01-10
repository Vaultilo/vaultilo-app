import React from 'react';
import TopBar from './TopBar.js';
import AppRouter from './AppRouter.js'; 
import SideBar from './Sidebar.js';
import { useFile } from "react-blockstack";

export default function Content ({ person }) {
  const [credentials, setCredentials] = useFile('crypto.json');
  const [passwords, setPasswords] = useFile('passwords.json');
  const [notes, setNotes] = useFile('notes.json');
  const avatarUrl = person.avatarUrl() || 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
  const name = person.name() || 'User';
  return credentials === undefined || passwords === undefined || notes === undefined ? (<div>Loading..</div>):(
    <main>
      <div className="d-flex">
        <div className="side-content">
          <SideBar credentials={credentials} />
        </div>
        <div className="main-content">
          <TopBar avatarUrl={avatarUrl} name={name} />
          <AppRouter
            credentials={credentials}
            setCredentials={setCredentials}
            passwords={passwords}
            setPasswords={setPasswords}
            notes={notes}
            setNotes={setNotes}
          />
        </div>
      </div>      
    </main> 
  )
}
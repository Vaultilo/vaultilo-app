import React from 'react';
import TopBar from './TopBar.js';
import AppRouter from './AppRouter.js';
import SideBar from './Sidebar.js';
import { useFile } from "react-blockstack";

export default function Content ({ person }) {
  const [credentials, setCredentials] = useFile(`crypto.json`);
  const avatarUrl = person.avatarUrl() || 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
  const name = person.name() || 'User';
  return credentials === undefined ? (<div>Loading..</div>):(
    <main className="container-fluid">
      <div className="row vh-100">
        <div className="col-12 col-md-3 col-xl-2 h-100 border px-0">
          <SideBar credentials={credentials} />
        </div>
        <div className="col-12 col-md-9 col-xl-10 border border-left-0">
          <TopBar avatarUrl={avatarUrl} name={name} />
          <AppRouter credentials={credentials} setCredentials={setCredentials} />
        </div>
      </div>      
    </main> 
  )
}
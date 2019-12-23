import React from 'react';
import TopBar from './TopBar.js';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../AppRouter.js';

export default function Content ({ person }) {
  const avatarUrl = person.avatarUrl() || 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
  const name = person.name() || 'User';
  return (
    <main className="container-fluid">
      <div className="row vh-100">
        <div className="col-12 col-md-3 col-xl-2 h-100 border">
          Sidebar
        </div>
        <div className="col-12 col-md-9 col-xl-10 border border-left-0">
          <TopBar avatarUrl={avatarUrl} name={name} />
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </div>
      </div>      
    </main>
  )
}
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Activities, NewActivity, Login, Register, AuthProvider, Account, NewRoutine, MyRoutines } from "./components";

import 'animate.css/animate.min.css';
import './index.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Account />} />
          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/activities/new' element={<NewActivity />} />
          <Route path='/activities' element={<Activities />} />
          <Route path='/routines/new' element={<NewRoutine />} />
          <Route path='/routines/public' element={<MyRoutines showPublicRoutines={true} />} />
          <Route path='/routines' element={<MyRoutines />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);
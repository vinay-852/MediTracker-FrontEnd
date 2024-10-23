// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import MedicineSchedule from './pages/schedule';
import UserLogs from './pages/UserLogs';
import Userlogger from './pages/Userlogger';
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path='/schedule' element={<PrivateRoute><MedicineSchedule /></PrivateRoute>} />
      <Route path='/logger' element={<PrivateRoute><Userlogger /></PrivateRoute>} />
      <Route path='/dashboard' element={<PrivateRoute><UserLogs /></PrivateRoute>} />
      
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
    </>
  );
};

export default App;

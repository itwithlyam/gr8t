import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import Login from '../Login';
import useToken from './useToken';

import './styles.css'


function Dashboard() {
  const { token, setToken } = useToken();  

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>        
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
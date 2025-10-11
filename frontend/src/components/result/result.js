// src/pages/Results.js
import React, { useEffect, useState } from 'react';
import './result.css';

const Results = () => {
  const [users, setUsers] = useState([]);
  const [loginEvents, setLoginEvents] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/all-users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchLoginEvents = async () => {
    try {
      const res = await fetch('http://localhost:5000/login-logs');
      const data = await res.json();
      setLoginEvents(data.logs || []);
    } catch (err) {
      console.error("Error fetching login logs:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLoginEvents();
  }, []);

  return (
    <div className="results-container">
      <h1>User Signup Details</h1>
      <table className="results-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            
            <th>Registered On</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td className="truncate-password">{u.password}</td>
              <td>{u.created_at ? new Date(u.created_at).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Login Events</h1>
      <table className="results-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {loginEvents.map((l, index) => (
            <tr key={index}>
              <td>{l.id}</td>
              <td>{l.email}</td>
              <td>{new Date(l.time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;

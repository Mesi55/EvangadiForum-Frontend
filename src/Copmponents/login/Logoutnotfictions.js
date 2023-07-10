import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function LogoutNotifications() {
  const [showNotification, setShowNotification] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  let countdownTimeout;

  useEffect(() => {
    countdownTimeout = setTimeout(() => {
      setShowNotification(true);
    }, 10000); 
    return () => {
      clearTimeout(countdownTimeout);
    };
  }, []);

  const handleContinue = () => {
    setShowNotification(false);
    resetTimer();
  };

  const handleLogout = () => {
    setShowNotification(false);
    logout();
  };

  const resetTimer = () => {
    clearTimeout(countdownTimeout);
    countdownTimeout = setTimeout(logout, 100000);
    console.log(countdownTimeout);
  };

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };
  return (
    <div>
      {showNotification && (
        <div className="notification">
          <h2>You have 15 minutes remaining. Do you want to continue or log out?</h2>
          <button onClick={handleContinue}>Continue</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default LogoutNotifications;

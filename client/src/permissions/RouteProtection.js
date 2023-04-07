import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const RouteProtection = ({ authenticatedUser, allowedPositions }) => {
  const [retrievedUser, setRetrievedUser] = useState(-1);

  useEffect(() => {
    axios
      .get('/user/authenticated-user')
      .then((res) => {
        setRetrievedUser(res.data.user);
      })
      .catch((err) => setRetrievedUser(null));
  }, [authenticatedUser]);

  if (retrievedUser === -1) return <></>;

  return allowedPositions.includes(retrievedUser?.position) ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
};

export default RouteProtection;

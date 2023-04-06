import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const LogoutButton = ({ logoutCallback }) => {
  const handleLogout = () => {
    axios
      .post('/user/logout')
      .then((res) => logoutCallback())
      .catch((err) => console.log(err));
  };

  return (
    <Button
      color='secondary'
      variant='contained'
      sx={{ width: '100%', mt: '10px', ml: '10px' }}
      onClick={handleLogout}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;

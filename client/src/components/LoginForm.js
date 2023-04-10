import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

const LoginField = styled(TextField)(({ theme }) => ({
  '& label': {
    fontSize: '0.9rem',
  },
  '& label.Mui-focused': {
    color: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.text.primary,
    },
    // '&:hover fieldset': {
    //   borderColor: theme.palette.text.primary,
    // },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
  // '& .MuiInputBase-input': {
  //   // borderRadius: 4,
  //   // position: 'relative',
  //   // fontSize: 16,
  //   // width: 'auto',
  //   padding: '10px 20px',
  // },
}));

const LoginForm = ({ loginCallback }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [loadingLogIn, setLoadingLogin] = useState(false);

  const handleLogin = () => {
    setLoadingLogin(true);
    axios
      .post('/api/user/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        loginCallback(res);
        setShowError(false);
        setLoadingLogin(false);
      })
      .catch((err) => {
        // console.log(err);
        setShowError(true);
        setLoadingLogin(false);
      });
  };

  return (
    <Box
      sx={{
        width: { xs: '80vw', sm: '17rem' },
        marginLeft: '15px',
      }}
    >
      <LoginField
        label='Email Address'
        variant='outlined'
        size='small'
        fullWidth
        margin='dense'
        autoComplete='off'
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <LoginField
        label='Password'
        variant='outlined'
        size='small'
        fullWidth
        margin='normal'
        autoComplete='off'
        type={'password'}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {showError && (
        <Typography variant='p' sx={{ color: 'red', fontStyle: 'italic' }}>
          Incorrect email or password
        </Typography>
      )}
      <Button
        color='secondary'
        variant='contained'
        sx={{ width: '100%', mt: '10px' }}
        onClick={handleLogin}
      >
        {loadingLogIn ? <CircularProgress size='1.4rem' /> : 'LOG IN'}
      </Button>
    </Box>
  );
};

export default LoginForm;

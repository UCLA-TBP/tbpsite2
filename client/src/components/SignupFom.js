import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import LoginField from './LoginForm'; 

const SignupForm = ({ loginCallback }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); 
    const [major, setMajor] = useState(''); 
    const [graduation_year, setGraduationYear] = useState(''); 
    const [initiationQuater, setInitiationQuarter] = useState(''); 

  
    const handleLogin = () => {
      axios
        .post('/api/user/login', {
          email: email,
          password: password,
        })
        .then((res) => {
          loginCallback(res);
        })
        .catch((err) => {
          console.log(err);
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
        <Button
          color='secondary'
          variant='contained'
          sx={{ width: '100%', mt: '10px' }}
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Button
          variant='text'
          color='secondary'
          sx = {{mx: 'auto', width: '100%', mt: '10px' }}
          //onClick={}
        >
          Sign up 
        </Button>
      </Box>
    );
  };
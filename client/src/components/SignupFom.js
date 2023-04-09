import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import LoginField from './LoginForm'; 

const SignupForm = ({ loginCallback }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState(''); 
    const [last_name, setLastName] = useState(''); 
    const [major, setMajor] = useState(''); 
    const [graduation_year, setGraduationYear] = useState(''); 
    const [initiation_quarter, setInitiationQuarter] = useState(''); 
    const [initiation_year, setInitiationYear] = useState(''); 
  
    const handleSignup = () => {
      axios
        .post('/api/user/register', {
          email: email,
          password: password,
          first_name: first_name, 
          last_name: last_name, 
          major: major,
          graduation_year: graduation_year,
          initiation_quarter: initiation_quarter, 
          initiation_year: initiation_year,
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
        <LoginField
          label='First Name'
          variant='outlined'
          size='small'
          halfWidth
          margin='normal'
          autoComplete='off'
          onKeyDown={(e) => {
            e.stopPropagation();
        }}
        onChange={(e) => {
            setFirstName(e.target.value);
        }}
        />
        <LoginField
          label='Last Name'
          variant='outlined'
          size='small'
          halfWidth
          margin='normal'
          autoComplete='off'
          onKeyDown={(e) => {
            e.stopPropagation();
        }}
        onChange={(e) => {
            setLastName(e.target.value);
        }}
        />
        <Select
          value='major'
          label='Major'
          onChange={(e) => {
            setMajor(e.target.value);
        }}
        >   
            <MenuItem>Aerospace Engineering</MenuItem>
            <MenuItem>Bioengineering</MenuItem>
            <MenuItem>Chemical Engineering</MenuItem>
            <MenuItem>Civil Engineering</MenuItem>
            <MenuItem>Computer Engineering</MenuItem>
            <MenuItem>Computer Science</MenuItem>
            <MenuItem>Computer Science and Engineering</MenuItem>
            <MenuItem>Electrical Engineering</MenuItem>
            <MenuItem>Materials Engineering</MenuItem>
            <MenuItem>Mechanical Engineering</MenuItem>
            <MenuItem>Undelcared Engineering</MenuItem>
        </Select>
        <LoginField
          label='Graduation Year'
          variant='outlined'
          size='small'
          halfWidth
          margin='normal'
          autoComplete='off'
          onKeyDown={(e) => {
            e.stopPropagation();
        }}
        onChange={(e) => {
            setGraduationYear(e.target.value);
        }}
        />
        <Grid>
          <Select
            value='initiation_quarter'
            label='Initiation Quarter'
            onChange={(e) => {
                setInitiationQuarter(e.target.value);
            }}
          >
            <MenuItem>Fall</MenuItem>
            <MenuItem>Spring</MenuItem>
          </Select>
          <LoginField
            label='Initiation Quarter'
            variant='outlined'
            size='small'
            halfWidth
            margin='normal'
            autoComplete='off'
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setInitiationYear(e.target.value);
             }}
        />
        </Grid>
        <Button
          variant='text'
          color='secondary'
          sx = {{mx: 'auto', width: '100%', mt: '10px' }}
        >
          Submit
        </Button>
      </Box>
    );
  };
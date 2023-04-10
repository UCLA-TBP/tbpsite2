import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container, Box, Button, MenuItem, TextField, Select, Grid, Typography} from '@mui/material';
import axios from 'axios';

const majors = [
  {
    value: 'Aerospace Engineering',
    label: 'Aerospace Engineering',
  },
  {
    value: 'Bioengineering',
    label: 'Bioengineering',
  },
  {
    value: 'Chemical Engineering',
    label: 'Chemical Engineering',
  },
  {
    value: 'Civil Engineering',
    label: 'Civil Engineering',
  },
  {
    value: 'Computer Engineering',
    label: 'Computer Engineering',
  },
  {
    value: 'Computer Science',
    label: 'Computer Science',
  },
  {
    value: 'Computer Science and Engineering',
    label: 'Computer Science and Engineering',
  },
  {
    value: 'Electrical Engineering',
    label: 'Electrical Engineering',
  },
  {
    value: 'Materials Engineering',
    label: 'Materials Engineering',
  },
  {
    value: 'Mechanical Engineering',
    label: 'Mechanical Engineering',
  },
  {
    value: 'Undeclared Engineering',
    label: 'Undeclared Engineering',
  },
]

const init_quarter = [
  {
    value: 'Fall', 
    label: 'Fall',
  },
  {
    value: 'Spring', 
    label: 'Spring',
  },
]

const SignupForm = ({ SignupCallback }) => {
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
          SignupCallback(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    return (
      <Container sx={{ paddingBottom: '100px'}}>
        <Typography variant='h2' mt={10} mb={3}>
        Sign up
      </Typography>
      <Box
        sx={{
          width: { xs: '80vw', sm: '17rem' },
          marginLeft: '15px',
        }}
      >
        <TextField
          label='Email Address'
          required
          variant='outlined'
          size='normal'
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
        <TextField
          label='Password'
          required
          variant='outlined'
          size='normal'
          fullWidth
          margin='dense'
          autoComplete='off'
          type={'password'}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          label='First Name'
          required
          variant='outlined'
          size='normal'
          fullWidth
          margin='dense'
          autoComplete='off'
          onKeyDown={(e) => {
            e.stopPropagation();
        }}
        onChange={(e) => {
            setFirstName(e.target.value);
        }}
        />
        <TextField
          label='Last Name'
          required
          variant='outlined'
          size='normal'
          margin='dense'
          fullWidth
          autoComplete='off'
          onKeyDown={(e) => {
            e.stopPropagation();
        }}
        onChange={(e) => {
            setLastName(e.target.value);
        }}
        />
        <TextField
          label='Major'
          required
          fullWidth
          select
          margin='dense'
          onChange={(e) => {
            setMajor(e.target.value);
        }}
        > 
        {majors.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField> 
        <TextField
          label='Graduation Year'
          variant='outlined'
          required
          size='normal'
          fullWidth          
          margin='dense'
          autoComplete='off'
          onKeyDown={(e) => {
            e.stopPropagation();
        }}
        onChange={(e) => {
            setGraduationYear(e.target.value);
        }}
        />
          <TextField
            label='Initiation Quarter'
            select
            fullWidth
            required
            margin='dense'
            onChange={(e) => {
                setInitiationQuarter(e.target.value);
            }}
          >
            {init_quarter.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
          </TextField>
          <TextField
            label='Initiation Year'
            required
            fullWidth
            margin='dense'
            variant='outlined'
            size='normal'
            autoComplete='off'
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setInitiationYear(e.target.value);
             }}
        />
        <Button
          variant='text'
          color='secondary'
          sx = {{mx: 'auto', width: '100%', mt: '10px' }}
          onClick={handleSignup}
        >
          Submit
        </Button>
      </Box>
      </Container>
    );
  };

  export default SignupForm; 
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container, Box, Button, MenuItem, TextField, Select, Grid, Typography, Snackbar} from '@mui/material';
import axios from 'axios';
import TBPBackground from '../components/TBPBackground';

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

const InputField = styled(TextField)(({ theme }) => ({
  '& label': {
    fontSize: '0.9rem',
  },
  '& label.Mui-focused': {
    color: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.text.main,
      backgroudColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.text.main,
    },
  },
//  '& .MuiInputBase-root': {
//    color: theme.palette.text.primary,
//  }
}));


const SignupForm = ({ SignupCallback }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState(''); 
    const [last_name, setLastName] = useState(''); 
    const [major, setMajor] = useState(''); 
    const [graduation_year, setGraduationYear] = useState(''); 
    const [initiation_quarter, setInitiationQuarter] = useState(''); 
    const [initiation_year, setInitiationYear] = useState(''); 
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
  
    const handleSignup = () => {
      axios
        .post('/api/user/register', {
          email: email,
          password: password,
          //confirm password?
          name: {first: first_name, last: last_name}, 
          major: major,
          graduationYear: graduation_year, //number
          initiationQuarter: {quarter: initiation_quarter, year: initiation_year},
          //check if a current officer is signing up and give officer permission automatically 
        })
        .then((res) => {
          console.log(res);
          //give a snackbar to tell the use their account has been created
          //redirect to home page
          setSnackbarMessage(res.message);
          setShowSnackbar(true);

        })
        .catch((err) => {
          console.log(err);
          setSnackbarMessage('Unable to sign up');
          setShowSnackbar(true);
        });
    };

    const handleSnackbarClose = (event, reason) => {
      setShowSnackbar(false);
    };
  
    return (
      <>
      <TBPBackground/>
      <Container 
      sx={{
        marginTop: '-10px',
        padding: '25px 35px 100px !important',
        backgroundColor: (theme) => theme.palette.custom.main,
      }}>
        <Typography variant='h2' mt={10} mb={3}>
        Sign up
      </Typography>
      <Box
        sx={{
          width: { xs: '80vw', sm: '17rem' },
          marginLeft: '15px',
        }}
      >
        <InputField
          label='Email Address'
          variant='outlined'
          required
          fullWidth
          margin='dense'
          autoComplete='off'
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            setEmail(e.email);
          }}
//          sx={{input: { color: 'while' } }}
          InputProps={{
            sx: {
                "& input": {
                 color: 'primary.main',
                },
              }
           }}
           sx ={{"& .MuiFormLabel-root": {
            color: 'primary.main'
            },
          }}
        />
        <InputField
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
          InputProps={{
            sx: {
                "& input": {
                 color: 'primary.main',
                },
              }
           }}
           sx ={{"& .MuiFormLabel-root": {
            color: 'primary.main'
            },
          }}
        />
        <InputField
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
        InputProps={{
          sx: {
              "& input": {
               color: 'primary.main',
              },
            }
         }}
         sx ={{"& .MuiFormLabel-root": {
          color: 'primary.main'
          },
        }}
        />
        <InputField
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
        InputProps={{
          sx: {
              "& input": {
               color: 'primary.main',
              },
            }
         }}
         sx ={{"& .MuiFormLabel-root": {
          color: 'primary.main'
          },
        }}
        />
        <InputField
          label='Major'
          required
          fullWidth
          select
          margin='dense'
          onChange={(e) => {
            setMajor(e.target.value);
        }}
        sx ={{"& .MuiFormLabel-root": {
          color: 'primary.main'
          },
          "& .MuiMenuItem-root":{
            color:'primaty.main'
          },
          "& .MuiInputBase-root": {
            color: 'primary.main'
        },
        }}
        > 
        {majors.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </InputField> 
        <InputField
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
        InputProps={{
          sx: {
              "& input": {
               color: 'primary.main',
              },
            }
         }}
         sx ={{"& .MuiFormLabel-root": {
          color: 'primary.main'
          },
        }}
        />
          <InputField
            label='Initiation Quarter'
            select
            fullWidth
            required
            margin='dense'
            onChange={(e) => {
                setInitiationQuarter(e.target.value);
            }}
             sx ={{"& .MuiFormLabel-root": {
              color: 'primary.main'
              },
              "& .MuiMenuItem-root":{
                color:'primaty.main'
              },
              "& .MuiInputBase-root": {
                color: 'primary.main'
            },
            }}
          >
            {init_quarter.map((option) => (
          <MenuItem key={option.value} value={option.value}
           sx ={{"& .MuiFormLabel-root": {
            color: 'primary.main'
            },
            "& .MuiMenuItem-root":{
              color:'primaty.main'
            },
          }}
           >
            {option.label}
          </MenuItem>
        ))}
          </InputField>
          <InputField
            label='Initiation Year'
            required
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
             InputProps={{
              sx: {
                  "& input": {
                   color: 'primary.main',
                  },
                }
             }}
             sx ={{"& .MuiFormLabel-root": {
              color: 'primary.main'
              },
            }}
        />
        <Button
          variant='outlined'
          color='secondary'
          sx = {{mx: 'auto', width: '100%', mt: '10px' }}
          onClick={handleSignup}
        >
          Submit
        </Button>
      </Box>
      <Snackbar
          open={showSnackbar}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          sx={{
            '& .MuiSnackbarContent-root': {
              color: 'black', //your custom color here
              backgroundColor: (theme) => theme.palette.secondary.main, //your custom color here
            },
          }}
        />
      </Container>
      </>
    );
  };

  export default SignupForm; 
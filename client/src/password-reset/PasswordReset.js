import React, { useState } from 'react';
import TBPBackground from '../components/TBPBackground';
import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSendLink = () => {
    axios
      .get('/api/user/get-user-by-email/' + email)
      .then((res) => {
        if (res.data) {
          axios
            .post('/api/user/send-reset-password-email/' + res.data._id)
            .then((res) => {
              setSnackbarMessage('Reset link sent!');
              setShowSnackbar(true);
            });
        } else {
          setSnackbarMessage('This email is not in use');
          setShowSnackbar(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage('Failed to send reset link');
        setShowSnackbar(true);
      });
  };

  return (
    <>
      <TBPBackground />
      <Container
        mt={4}
        mb={4}
        sx={{
          backgroundColor: (theme) => theme.palette.custom.main,
          padding: '10px 50px 24px',
          borderRadius: '12px',
        }}
      >
        <Typography
          variant='h2'
          mt={15}
          mb={1}
          color='primary'
          sx={{
            fontWeight: 'bold',
          }}
        >
          Reset Password
        </Typography>
        <Typography mb={1} variant='p' color='custom2'>
          A password reset link will be sent to the following address.
        </Typography>
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          rowSpacing={1}
          // sx={{
          //   // width: { xs: '100%', sm: '75%', md: '65%', lg: '55%' },
          //   width: '100%',
          // }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3.5}>
            <TextField
              id='outlined-input'
              label='Email'
              size='small'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': {
                  color: (theme) => theme.palette.secondary.main,
                },
                '& input': {
                  color: (theme) => theme.palette.primary.main,
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: (theme) => theme.palette.custom2.main,
                },
                minWidth: '100%',
              }}
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='secondary'
          sx={{ marginTop: '14px' }}
          onClick={handleSendLink}
        >
          SEND LINK
        </Button>
      </Container>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
        sx={{
          '& .MuiSnackbarContent-root': {
            color: 'black', //your custom color here
            backgroundColor: (theme) => theme.palette.secondary.main, //your custom color here
          },
        }}
      />
    </>
  );
};

export default PasswordReset;

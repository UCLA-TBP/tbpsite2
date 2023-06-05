import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TBPBackground from '../components/TBPBackground';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

const ChooseNewPassword = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [badLink, setBadLink] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('/api/user/get-user/' + id)
      .then((res) => {
        const reqTime = res.data.lastPasswordResetReq;
        let oneDayAgo = new Date();
        oneDayAgo.setHours(oneDayAgo.getHours() - 24);
        console.log(reqTime);
        if (!reqTime || new Date(reqTime) < oneDayAgo) {
          setUser(-1);
          setBadLink(true);
          return;
        }
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUser(-1);
        setBadLink(true);
      });
  }, [id]);

  const handleReset = () => {
    if (
      newPassword === '' ||
      confirmPassword === '' ||
      newPassword !== confirmPassword
    ) {
      setSnackbarMessage('Password fields must match');
      setShowSnackbar(true);
      return;
    }
    setLoading(true);
    axios
      .put('/api/user/update-password/' + user._id, {
        newPassword: newPassword,
      })
      .then((res) => {
        axios
          .post('/api/user/clear-reset-password-req-time/' + user._id)
          .then((res) => {
            setSnackbarMessage('Password reset successfully!');
            setShowSnackbar(true);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        setSnackbarMessage('Could not reset password');
        setShowSnackbar(true);
        console.log(err);
        setLoading(false);
      });
  };

  if (user === null) return <></>;
  return (
    <>
      <TBPBackground />
      <Container
        sx={{
          marginTop: '-10px',
          padding: '25px 35px 18px !important',
          width: { xs: '100vw', sm: '27rem' },
          borderRadius: '12px',
          // textAlign: 'center !important',
          backgroundColor: (theme) => theme.palette.custom.main,
        }}
      >
        {badLink ? (
          <Typography
            variant='p'
            mt={15}
            mb={1}
            color='secondary'
            sx={{ fontStyle: 'italic' }}
          >
            This link is no longer valid.
          </Typography>
        ) : (
          <>
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
            <Grid
              container
              spacing={{ xs: 1, md: 2 }}
              rowSpacing={2}
              // sx={{
              //   // width: { xs: '100%', sm: '75%', md: '65%', lg: '55%' },
              //   width: '100%',
              // }}
            >
              <Grid item xs={12} sm={10}>
                <TextField
                  id='outlined-input'
                  label='New Password'
                  size='small'
                  value={newPassword}
                  type='password'
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: (theme) => theme.palette.secondary.main,
                    },
                    '& input': {
                      color: (theme) => theme.palette.primary.main,
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: (theme) => theme.palette.custom2.main,
                      },
                    minWidth: '100%',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id='outlined-input'
                  label='Confirm New Password'
                  size='small'
                  value={confirmPassword}
                  type='password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{
                    '& .MuiInputLabel-root': {
                      color: (theme) => theme.palette.secondary.main,
                    },
                    '& input': {
                      color: (theme) => theme.palette.primary.main,
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                      {
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
              sx={{ marginTop: '12px' }}
              onClick={handleReset}
            >
              {loading ? (
                <CircularProgress
                  size='1.5rem'
                  sx={{
                    color: '#000',
                    marginLeft: '0.6rem',
                    marginRight: '0.6rem',
                  }}
                />
              ) : (
                'RESET'
              )}
            </Button>
          </>
        )}
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

export default ChooseNewPassword;

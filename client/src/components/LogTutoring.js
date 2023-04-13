import React, { useState } from 'react';
import axios from 'axios';
import './LogTutoring.css';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Snackbar,
} from '@mui/material';

function LogTutoring({ candidate, setCandidate }) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    setShowSnackbar(false);
  };

  const [weekOption, setWeekOption] = useState(2);
  function handleWeekOptionChange(event) {
    console.log(event.target.value);
    setWeekOption(Number(event.target.value));
  }

  const [numHours, setNumHours] = useState(0);
  function handleNumHoursChange(event) {
    console.log(event.target.value);
    setNumHours(Number(event.target.value));
  }

  const [secretPhrase, setSecretPhrase] = useState('');
  function handleSecretPhraseChange(event) {
    console.log(event.target.value);
    setSecretPhrase(event.target.value);
  }

  function handleSubmit() {
    const updatedCandidate = {
      ...candidate,
      tutoringLog: [
        ...candidate.tutoringLog,
        {
          week: weekOption,
          hours: numHours,
          secretPhrase: secretPhrase,
        },
      ],
    };

    axios
      .put('/api/user/update-user/' + candidate._id, updatedCandidate)
      .then((res) => {
        setCandidate(updatedCandidate);
        console.log(updatedCandidate);
        setSnackbarMessage('Log submitted!');
        setShowSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage('Submission error!');
        setShowSnackbar(true);
      });

    setNumHours(0);
    setWeekOption(2);
    setSecretPhrase('');
  }

  return (
    <>
      <Box sx={{ display: 'inline-flex' }} mt={2}>
        <FormControl
          sx={{
            m: 1,
            minWidth: 80,
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette.custom2.main,
            },
          }}
          size='small'
        >
          <InputLabel
            id='week-select-label'
            style={{
              color: 'gold',
              borderColor: (theme) => theme.palette.primary.main,
            }}
          >
            Week
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={weekOption}
            label='Week'
            onChange={handleWeekOptionChange}
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            <MenuItem value={3}>Week 3</MenuItem>
            <MenuItem value={4}>Week 4</MenuItem>
            <MenuItem value={5}>Week 5</MenuItem>
            <MenuItem value={6}>Week 6</MenuItem>
            <MenuItem value={7}>Week 7</MenuItem>
            <MenuItem value={8}>Week 8</MenuItem>
            <MenuItem value={9}>Week 9</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id='outlined-number'
          label='Hours'
          type='number'
          size='small'
          onChange={handleNumHoursChange}
          InputLabelProps={{}}
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
            paddingBottom: '10px',
            marginTop: '8px',
            marginLeft: '12px',
          }}
        />

        <TextField
          id='outlined-input'
          label='Secret Phrase'
          size='small'
          defaultValue=''
          onChange={handleSecretPhraseChange}
          InputProps={{}}
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
            paddingBottom: '10px',
            marginTop: '8px',
            marginLeft: '20px',
          }}
        />
      </Box>

      <Box>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={handleSubmit}
          sx={{ marginTop: '2px', marginLeft: '7px' }}
        >
          Submit Log
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
    </>
  );
}

export default LogTutoring;

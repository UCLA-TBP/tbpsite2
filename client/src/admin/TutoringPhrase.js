import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import TBPBackground from '../components/TBPBackground';

const TutoringPhrase = () => {
	const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    setShowSnackbar(false);
  };

  const [weekOption, setWeekOption] = useState(0);
  function handleWeekOptionChange(event) {
    console.log(event.target.value);
    setWeekOption(Number(event.target.value));
  }

  const [secretPhrase, setSecretPhrase] = useState('');
  function handleSecretPhraseChange(event) {
    console.log(event.target.value);
    setSecretPhrase(event.target.value);
  }

  const handleSubmit = () => {
		axios
			.post('/api/phrase/set-phrase',{
				week: weekOption, 
				secretPhrase: secretPhrase,
			})
			.then((res) => {
				console.log(res);
				setSnackbarMessage('Phrase recorded!');
				setShowSnackbar(true);
			})
			.catch((err) => {
				console.log(err);
				setSnackbarMessage('Submission error!');
				setShowSnackbar(true);
			});
		setWeekOption(2);
		setSecretPhrase('');
	};
	
  return (
  <>
    <TBPBackground/>
    <Container
			mt={4}
			mb={4}
			sx={{
				backgroundColor: (theme) => theme.palette.custom.main,
				padding: '10px 50px 50px',
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
					Set Tutoring Phrase
			</Typography>
			<Box sx={{ display: 'inline-flex' }} mt={1}>
        <FormControl
          sx={{
            m: 1,
            minWidth: 80,
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: (theme) => theme.palette.custom2.main,
            },
          }}
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
          id='outlined-input'
          label='Secret Phrase'
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
          onClick={handleSubmit}
          sx={{ marginTop: '20px', marginLeft: '7px' }}
        >
          Submit Phrase
        </Button>
      </Box>
    </Container>

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
};

export default TutoringPhrase; 

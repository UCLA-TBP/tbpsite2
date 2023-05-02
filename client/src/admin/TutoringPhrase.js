import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
	MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import TBPBackground from '../components/TBPBackground';

const week = [
	{
		value: 3, 
		label: 'Week 3', 
	},
	{
		value: 4, 
		label: 'Week 4', 
	},
	{
		value: 5, 
		label: 'Week 5', 
	},
	{
		value: 6, 
		label: 'Week 6', 
	},
	{
		value: 7, 
		label: 'Week 7', 
	},
	{
		value: 8, 
		label: 'Week 8', 
	},
	{
		value: 9, 
		label: 'Week 9', 
	}
];

const TutoringPhrase = () => {
	const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    setShowSnackbar(false);
  };

  const [weekOption, setWeekOption] = useState(2);
  function handleWeekOptionChange(event) {
    console.log(event.target.value);
    setWeekOption(event.target.value);
  }

  const [secretPhrase, setSecretPhrase] = useState('');
  function handleSecretPhraseChange(event) {
    console.log(event.target.value);
    setSecretPhrase(event.target.value);
  }

  useEffect(()=> {
	console.log(weekOption)
  },[weekOption])

  const handleSubmit = () => {
		console.log(weekOption)
		axios
			.post('/api/phrase/set-phrase',{
				tutoringPhrase:
				{week: weekOption, 
				secretPhrase: secretPhrase},
			})
			.then((res) => {
				console.log(res);
				console.log('axios request');
				setSnackbarMessage('Phrase recorded!');
				setShowSnackbar(true);
			})
			.catch((err) => {
				console.log(err);
				setSnackbarMessage('Submission error!');
				setShowSnackbar(true);
			});
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
				<TextField
					label='Week'
					onChange={handleWeekOptionChange}
					value={weekOption}
					select
					sx={{
					'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
						borderColor: (theme) => theme.palette.custom2.main,
					}, 
					'& .MuiFormLabel-root': {
						color: 'secondary.main',
					},
					'& .MuiMenuItem-root': {
						color: 'primaty.main',
					},
					'& .MuiInputBase-root': {
						color: 'primary.main',
					},
					paddingBottom: '10px',
					marginTop: '8px',
					marginLeft: '20px',
					width: '60%',
				}}
				>
					{week.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>

        <TextField
          id='outlined-input'
          label='Secret Phrase'
          defaultValue=''
					fullWidth
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

          //  labelId='demo-simple-select-label'
          //  id='demo-simple-select'
          //  value={weekOption}
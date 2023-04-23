import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Snackbar,
} from '@mui/material';
import SubmittedTests from './SubmittedTests';
import _ from 'lodash';

function UploadTest({ candidate, setCandidate }) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    setShowSnackbar(false);
  };

  const subjects = [
    'BE',
    'CEE',
    'CHEM',
    'CHEME',
    'CS',
    'ECON',
    'EE',
    'ENGR',
    'LS',
    'MAE',
    'MATH',
    'MGMT',
    'MSE',
    'PHYSICS',
    'STATS',
  ];

  const [subject, setSubject] = useState('');
  function handleSubjectChange(event) {
    setSubject(event.target.value);
  }

  const [professor, setProfessor] = useState('');
  function handleProfessorChange(event) {
    setProfessor(event.target.value);
  }

  const [classNumber, setClassNumber] = useState('');
  function handleClassNumberChange(event) {
    setClassNumber(event.target.value);
  }

  function handleUpload(event) {
    event.preventDefault(); // prevent default form submission behavior

    // Get the file input element and the selected PDF file
    const fileInput = document.querySelector('input[name="pdf"]');
    const file = fileInput.files[0];
    if (!file) {
      setSnackbarMessage('Please select a PDF');
      setShowSnackbar(true);
      return;
    }
    if (file.size >= 4000000) {
      setSnackbarMessage('PDF too big! PDFs are limited to 4MB');
      setShowSnackbar(true);
      return;
    }
    if (!subject || !professor || !classNumber) {
      setSnackbarMessage('Please fill out all inputs');
      setShowSnackbar(true);
      return;
    }
    axios
      .get('/api/user/get-user/' + candidate._id)
      .then((response) => {
        const user = response.data; // get the user object from the response

        // Create a new FormData object to send the file data and user reference to the server
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('userRef', JSON.stringify(user)); // pass the user object as a JSON string
        formData.append('subject', subject);
        formData.append('professor', _.startCase(professor));
        formData.append('classNumber', classNumber);

        // Send a POST request to the server with the form data using Axios
        axios
          .post('/api/pdf/upload', formData)
          .then((response) => {
            // This might need to be of type mongoose.Schema.Types.ObjectId
            const testId = response.data.pdfId;

            const updatedCandidate = {
              ...candidate,
              submittedTests: [...candidate.submittedTests, testId],
            };
            // Associate the newly uploaded PDF's id with the current user
            axios
              .put('/api/user/update-user/' + candidate._id, updatedCandidate)
              .then((res) => {
                setCandidate(updatedCandidate);
              })
              .catch((err) => {
                console.log(err);
              });

            setSnackbarMessage('Test uploaded successfully!');
            setShowSnackbar(true);
          })
          .catch((error) => {
            console.error(error);
            setSnackbarMessage('Upload failed!');
            setShowSnackbar(true);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    setClassNumber('');
    setProfessor('');
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
            id='subject-select-label'
            sx={{ color: (theme) => theme.palette.secondary.main }}
          >
            Subject
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={subject}
            label='Subject'
            onChange={handleSubjectChange}
            sx={{
              color: (theme) => theme.palette.primary.main,
              borderColor: (theme) => theme.palette.custom2.main,
            }}
          >
            {subjects.map((subjectName) => (
              <MenuItem key={subjectName} value={subjectName}>
                {subjectName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id='outlined-input'
          label='Class Number'
          size='small'
          defaultValue=''
          onChange={handleClassNumberChange}
          InputProps={{ placeholder: 'e.g. 35L for CS 35L' }}
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
          label='Professor'
          size='small'
          defaultValue=''
          onChange={handleProfessorChange}
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
        <form encType='multipart/form-data'>
          <input
            type='file'
            name='pdf'
            accept='application/pdf'
            style={{ color: 'gold', marginLeft: '8px' }}
          />
          <br />
          <Button
            variant='contained'
            size='small'
            color='secondary'
            onClick={handleUpload}
            type='submit'
            sx={{ marginLeft: '8px', marginTop: '8px' }}
          >
            Submit Test
          </Button>
        </form>
      </Box>

      <SubmittedTests candidate={candidate}></SubmittedTests>

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

export default UploadTest;

import { Box, Button, Container, Snackbar, Typography } from '@mui/material';
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import React, { useState } from 'react';
import LogTutoring from '../components/LogTutoring';

const Check = styled(CheckIcon)(({ theme }) => ({
  position: 'relative',
  top: '5px',
}));

const Cross = styled(CloseIcon)(({ theme }) => ({
  position: 'relative',
  top: '5px',
}));

const RequirementDescription = ({ description }) => {
  return (
    <Typography
      variant='p'
      color='custom'
      sx={{ fontSize: '1.1rem', marginTop: '8px' }}
    >
      {description}
    </Typography>
  );
};

const ProgressIndicator = ({ requirementMet }) => {
  
  if (requirementMet)
    return (
      <Typography
        variant='p'
        color='secondary'
        sx={{ fontStyle: 'italic', fontSize: '0.9rem' }}
      >
        Requirement met <Check fontSize='small' />
      </Typography>
    );
  return (
    <Typography
      variant='p'
      color='secondary'
      sx={{ fontStyle: 'italic', fontSize: '0.9rem' }}
    >
      Requirement not met <Cross fontSize='small' />
    </Typography>
  );
};

const InductionProgress = ({ candidate, setCandidate }) => {

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  function handleUpload(event) {
    event.preventDefault(); // prevent default form submission behavior

    // Get the file input element and the selected PDF file
    const fileInput = document.querySelector('input[name="pdf"]');
    const file = fileInput.files[0];
  
    axios.get('/api/user/get-user/' + candidate._id)
    .then(response => {
      const user = response.data; // get the user object from the response

      // Create a new FormData object to send the file data and user reference to the server
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('userRef', JSON.stringify(user)); // pass the user object as a JSON string

      // Send a POST request to the server with the form data using Axios
      axios.post('/api/pdf/upload', formData)
        .then(response => {
          console.log('PDF uploaded successfully');
          setSnackbarMessage('Test uploaded successfully!');
          setShowSnackbar(true);
        })
        .catch(error => {
          console.error(error);
          setSnackbarMessage('Upload failed!');
          setShowSnackbar(true);
        });
    })
    .catch(error => {
      console.error(error);
    });
  } 

  const updateRequirement = (requirement, requirementMet) => {
    // requirement (String): name of requirement (as per UserSchema, e.g. 'testBank')
    // requirement (Boolean): is requirement met? (should probably be true)
    const updatedCandidate = {
      ...candidate,
      requirements: {
        ...candidate.requirements,
        [requirement]: requirementMet,
      },
    };

    axios
      .put('/api/user/update-user/' + candidate._id, updatedCandidate)
      .then((res) => {
        setSnackbarMessage('Induction requirement updated!');
        setShowSnackbar(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarMessage('Save error!');
        setShowSnackbar(true);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    setShowSnackbar(false);
  };

  if (!candidate) return <></>;
  return (
    <Container sx={{ paddingBottom: '100px'}}>
      <Typography variant='h2' color='primary' mt={10}>
        Induction Progress
      </Typography>
      <Typography variant='p' mt = {5}>
        These candidate requirements are meant for you to meet other TBP members and serve our community!
      </Typography>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Tutoring
        </Typography>
        <RequirementDescription
          description={
            '2 hours/week required from Weeks 3-9. Drop-in tutoring style! You can pick the subjects you can tutor.'
          }
        />
        {/* TODO: dillon */}
        
        {/*<Button
          variant='contained'
          onClick={(e) => updateRequirement('tutoring', true)}
        >
          Test update requirement
      </Button>*/}
        <LogTutoring candidate={candidate} setCandidate={setCandidate}></LogTutoring>
        <ProgressIndicator requirementMet={candidate.requirements?.tutoring} />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Submit Test for Test Bank
        </Typography>
        <RequirementDescription
          description={
            'Submit a copy of one of your tests to our members-only test bank.'
          }
        />
        <form encType="multipart/form-data">
          <input type="file" name="pdf" accept="application/pdf" style={{color:'grey'}}/>
          <button onClick = {handleUpload} type="submit">Upload</button>
        </form>
        <ProgressIndicator requirementMet={candidate.requirements?.testBank} />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          New Member Form
        </Typography>
        <RequirementDescription
          description={
            'Confirm your candidacy!'
          }
        />        
        <ProgressIndicator
          requirementMet={candidate.requirements?.newMemberForm}
        />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Corporate
        </Typography>
        <RequirementDescription
          description={
            'Attend the corporate event'
          }
        /> 
        <ProgressIndicator requirementMet={candidate.requirements?.corporate} />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          General Social
        </Typography>
        <RequirementDescription
          description={
            'Come out to fulfill requirements and meet other candidates and officers!'
          }
        /> 
        <ProgressIndicator
          requirementMet={candidate.requirements?.generalSocial}
        />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Mentor/Mentee Coffee Chat
        </Typography>
        <RequirementDescription
          description={
            'Have a short, casual meeting with a TBP officer! Feel free to ask them any questions or just hang out.'
          }
        /> 
        <ProgressIndicator
          requirementMet={candidate.requirements?.coffeeChat}
        />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Academic Outreach
        </Typography>
        <RequirementDescription
          description={
            'Help run midterm/final review sessions for lower division classes.'
          }
        /> 
        <ProgressIndicator
          requirementMet={candidate.requirements?.academicOutreach}
        />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Candidate Quiz
        </Typography>
        <RequirementDescription
          description={
            'Take the candidate quiz to show your TBP knowledge.'
          }
        /> 
        <ProgressIndicator
          requirementMet={candidate.requirements?.candidateQuiz}
        />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Bent Polishing
        </Typography>
        <RequirementDescription
          description={
            'Help keep our bent nice and shiny.'
          }
        /> 
        <ProgressIndicator
          requirementMet={candidate.requirements?.bentPolishing}
        />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Social Media Post
        </Typography>
        <RequirementDescription
          description={
            'Advertise TBP on social media. @uclatbp'
          }
        /> 
        <ProgressIndicator
          requirementMet={candidate.requirements?.socialMediaPost}
        />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Chalking
        </Typography>
        <RequirementDescription
          description={
            'Advertise TBP on the board in one of your classes.'
          }
        /> 
        <ProgressIndicator requirementMet={candidate.requirements?.chalking} />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Membership Fee
        </Typography>
        <RequirementDescription
          description={
            'Pay a one-time fee for smart study buddies.'
          }
        /> 
        <ProgressIndicator
          requirementMet={candidate.requirements?.membershipFee}
        />
      </Box>

      <Box mt={5}>
        <Typography variant='h3' color='primary'>
          Initiation
        </Typography>
        <RequirementDescription
          description={
            'Officially join Tau Beta Pi and become a member! #TBP'
          }
        /> 
        <ProgressIndicator
          requirementMet={candidate.requirements?.initiation}
        />
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
  );
};

export default InductionProgress;

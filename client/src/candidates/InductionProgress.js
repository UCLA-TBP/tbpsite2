import { Box, Grid, Container, Snackbar, Typography } from '@mui/material';
import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import LogTutoring from '../components/LogTutoring';
import TBPBackground from '../components/TBPBackground';
import UploadTest from '../components/UploadTest';

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
  //eslint-disable-next-line
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // const updateRequirement = (requirement, requirementMet) => {
  //   // requirement (String): name of requirement (as per UserSchema, e.g. 'testBank')
  //   // requirement (Boolean): is requirement met? (should probably be true)
  //   const updatedCandidate = {
  //     ...candidate,
  //     requirements: {
  //       ...candidate.requirements,
  //       [requirement]: requirementMet,
  //     },
  //   };

  //   axios
  //     .put('/api/user/update-user/' + candidate._id, updatedCandidate)
  //     .then((res) => {
  //       setSnackbarMessage('Induction requirement updated!');
  //       setShowSnackbar(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setSnackbarMessage('Save error!');
  //       setShowSnackbar(true);
  //     });
  // };

  const handleSnackbarClose = (event, reason) => {
    setShowSnackbar(false);
  };

  if (!candidate) return <></>;
  return (
    <>
      <TBPBackground />
      <Container
        sx={{
          marginTop: '-14px',
          padding: '25px 35px 100px !important',
          backgroundColor: (theme) => theme.palette.custom.main,
        }}
      >
        <Typography variant='h2' color='primary' mt={10}>
          Induction Progress
        </Typography>
        <Typography variant='p' mt={5}>
          These candidate requirements are meant for you to meet other TBP
          members and serve our community!
        </Typography>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Tutoring
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.tutoring}
          />
          <RequirementDescription
            description={
              '2 hours/week required from Weeks 3-9. Drop-in tutoring style! You can pick the subjects you can tutor.'
            }
          />
          <LogTutoring
            candidate={candidate}
            setCandidate={setCandidate}
          ></LogTutoring>
        </Box>

        <Box mt={5}>
          <Typography variant='h4' color='secondary' mt={3} mb={1}>
            Tutoring Logs
          </Typography>

          {candidate.tutoringLog?.length ? (
            candidate.tutoringLog.map((entry, index) => (
              <Grid
                key={index}
                container
                rowSpacing={1}
                columnSpacing={{ xs: 15, sm: 2, md: 3 }}
              >
                <Grid style={{ color: 'white' }} item xs={2}>
                  Week: {entry.week}
                </Grid>
                <Grid style={{ color: 'white' }} item xs={2}>
                  Hours: {entry.hours}
                </Grid>
                <Grid style={{ color: 'white' }} item xs={3}>
                  Secret Phrase: {entry.secretPhrase}
                </Grid>
              </Grid>
            ))
          ) : (
            <Typography
              variant='p'
              mt={1}
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: '1rem',
              }}
            >
              None
            </Typography>
          )}
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Submit Test for Test Bank
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.testBank}
          />
          <RequirementDescription
            description={
              'Submit a copy of one of your tests to our members-only test bank.'
            }
          />
          <UploadTest candidate={candidate} setCandidate={setCandidate} />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            New Member Form
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.newMemberForm}
          />
          <RequirementDescription description={'Confirm your candidacy!'} />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Corporate
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.corporate}
          />
          <RequirementDescription
            description={
              'Attend a corporate or professional development event!'
            }
          />
        </Box>

        {/* <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Interview
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.interview}
          />
          <RequirementDescription
            description={
              'Take part in a low-stakes interview in a friendly environment!'
            }
          />
        </Box> */}

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            General Socials
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.generalSocial1}
          />
          <ProgressIndicator
            requirementMet={candidate.requirements?.generalSocial2}
          />
          <RequirementDescription
            description={
              'Come out to at least two socials fulfill requirements and meet other candidates and officers!'
            }
          />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Mentor/Mentee Coffee Chat
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.coffeeChat}
          />
          <RequirementDescription
            description={
              'Have a short, casual meeting with a TBP officer! Feel free to ask them any questions or just hang out.'
            }
          />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Academic Outreach
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.academicOutreach}
          />
          <RequirementDescription
            description={
              'Help run midterm/final review sessions for lower division classes.'
            }
          />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Candidate Quiz
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.candidateQuiz}
          />
          <RequirementDescription
            description={'Take the candidate quiz to show your TBP knowledge.'}
          />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Bent Polishing
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.bentPolishing}
          />
          <RequirementDescription
            description={'Help keep our bent nice and shiny.'}
          />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Social Media Post
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.socialMediaPost}
          />
          <RequirementDescription
            description={'Advertise TBP on social media. @uclatbp'}
          />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Chalking
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.chalking}
          />
          <RequirementDescription
            description={'Advertise TBP on the board in one of your classes.'}
          />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Membership Fee
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.membershipFee}
          />
          <RequirementDescription
            description={
              'Covers national and chapter dues, a certificate, and a subscription to “The Bent” magazine.'
            }
          />
        </Box>

        <Box mt={5}>
          <Typography variant='h3' color='primary'>
            Initiation
          </Typography>
          <ProgressIndicator
            requirementMet={candidate.requirements?.initiation}
          />
          <RequirementDescription
            description={
              'Officially join Tau Beta Pi and become a member! #TBP'
            }
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
    </>
  );
};

export default InductionProgress;

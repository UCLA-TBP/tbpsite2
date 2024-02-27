import React, { useEffect, useState } from 'react';
import {
  alpha,
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
  createFilterOptions,
} from '@mui/material';
import SubmittedTests from '../components/SubmittedTests';
import { positions } from '../permissions/PermissionsUtils';
import UploadHeadshot from '../components/UploadHeadshot.js';
import axios from 'axios';
import _ from 'lodash';
import TBPBackground from '../components/TBPBackground';
import DistinguishedActiveMemberReqs from '../components/DistinguishedActiveMemberReqs';
import { OfficerCommitteeSelector, CommitteeList } from '../components/OfficerCommitteeHelpers';


const filterOptions = createFilterOptions({
  ignorecase: true,
});

const CandidateTracker = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    axios
      .get('/api/user/get-all-users')
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSave = (e) => {
    axios
      .put('/api/user/update-user/' + selectedCandidate._id, selectedCandidate)
      .then((res) => {
        axios
          .get('/api/user/get-all-users')
          .then((res) => {
            setCandidates(res.data);
            setSnackbarMessage('Save successful!');
            setShowSnackbar(true);
          })
          .catch((err) => {
            console.log(err);
            setSnackbarMessage('Save error!');
            setShowSnackbar(true);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (e) => {
    axios
      .put('/api/user/delete-user/' + selectedCandidate._id, selectedCandidate)
      .then((res) => {
        axios
          .get('/api/user/get-all-users')
          .then((res) => {
            setCandidates(res.data);
            setSelectedCandidate(null);
            let newCandidates = candidates.filter(
              (candidate) => candidate._id !== selectedCandidate._id
            );
            setCandidates(newCandidates);

            setSnackbarMessage('Deletion successful!');
            setShowSnackbar(true);
          })
          .catch((err) => {
            console.log(err);
            setSnackbarMessage('Deletion error!');
            setShowSnackbar(true);
          });
      })
      .catch((err) => console.log(err));
  };

  const handleSnackbarClose = (event, reason) => {
    setShowSnackbar(false);
  };

  return (
    <>
      <TBPBackground />
      <Container sx={{ paddingTop: '85px !important' }}>
        <Box
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.custom.main, 0.95),
            borderRadius: '12px',
          }}
          p={5}
        >
          <Typography
            variant='h2'
            mb={3}
            color='primary'
            sx={{
              fontWeight: 'bold',
            }}
          >
            Candidate Tracker
          </Typography>
          <Typography variant='h3' color='primary' mt={3} mb={1}>
            Candidate Name
          </Typography>
          <Autocomplete
            disablePortal
            options={candidates}
            getOptionLabel={(candidate) =>
              `${candidate.name?.first} ${candidate.name?.last}`
            }
            onChange={(e, val) => {
              setSelectedCandidate(val);
            }}
            value={selectedCandidate}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: '0.2rem',
            }}
            filterOptions={filterOptions}
            isOptionEqualToValue={(option, value) =>
              option.email === value.email
            }
            renderInput={(params) => {
              return <TextField {...params} />;
            }}
          />
        </Box>
        {selectedCandidate && (
          <Box
            mt={4}
            mb={4}
            sx={{
              backgroundColor: (theme) => theme.palette.custom.main,
              padding: '1px 40px 10px',
              borderRadius: '12px',
            }}
          >
            {selectedCandidate.position === positions.candidate && (
              <>
                <Typography variant='h4' color='secondary' mt={3} mb={1}>
                  Candidate Requirements
                </Typography>
                {selectedCandidate.requirements &&
                  Object.entries(selectedCandidate.requirements).map(
                    ([requirement, status]) => {
                      return (
                        <Grid container key={requirement}>
                          <Grid item xs={9} md={2}>
                            <Typography
                              variant='p'
                              color='primary'
                              sm={3}
                              sx={{
                                fontSize: '1rem',
                                width: '15rem',
                              }}
                            >
                              {_.startCase(requirement)}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <input
                              id={requirement}
                              type='checkbox'
                              checked={status}
                              onChange={(e) => {
                                setSelectedCandidate({
                                  ...selectedCandidate,
                                  requirements: {
                                    ...selectedCandidate.requirements,
                                    [e.target.id]: e.target.checked,
                                  },
                                });
                              }}
                            />
                          </Grid>
                        </Grid>
                      );
                    }
                  )}
              </>
            )}

            <Typography variant='h4' color='secondary' mt={3} mb={1}>
              Membership Status
            </Typography>
            <select
              value={selectedCandidate.position}
              onChange={(e) => {
                setSelectedCandidate({
                  ...selectedCandidate,
                  position: e.target.value,
                });
              }}
            >
              {Object.values(positions).map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>

            {selectedCandidate.position === positions.officer ? (
              <div>
                <Typography variant='h4' color='secondary' mt={3} mb={1}>
                  Officer Committees
                </Typography>

                <OfficerCommitteeSelector
                  committeeOptions={
                    selectedCandidate.committees
                  }
                  selectedCandidate={selectedCandidate}
                  setSelectedCandidate={setSelectedCandidate}
                />
              </div>
            ) : null}

            {selectedCandidate.position === positions.member ? (
              <div>
                <Typography variant='h4' color='secondary' mt={3} mb={1}>
                  Distinguished Active Member Progress
                </Typography>

                <Typography
                  variant='p'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontSize: '1rem',
                  }}
                >
                  Quarter 1
                </Typography>

                <DistinguishedActiveMemberReqs
                  requirements={
                    selectedCandidate.distinguishedActiveMember
                      .quarterOneRequirements
                  }
                  selectedCandidate={selectedCandidate}
                  setSelectedCandidate={setSelectedCandidate}
                />

                <br />

                <Typography
                  variant='p'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontSize: '1rem',
                  }}
                >
                  Quarter 2
                </Typography>

                <DistinguishedActiveMemberReqs
                  requirements={
                    selectedCandidate.distinguishedActiveMember
                      .quarterTwoRequirements
                  }
                  selectedCandidate={selectedCandidate}
                  setSelectedCandidate={setSelectedCandidate}
                />
              </div>
            ) : null}

            <Grid
              container
              pt={3}
              sx={{ display: 'flex', justifyContent: 'left' }}
            >
              <Grid item xs={12} sm={3} lg={2}>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={handleSave}
                  sx={{ width: '100%' }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
            <Typography variant='h4' color='secondary' mt={3} mb={1}>
              Tutoring Logs
            </Typography>

            {selectedCandidate.tutoringLog?.length ? (
              selectedCandidate.tutoringLog.map((entry, index) => (
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
            <Typography variant='h4' color='secondary' mt={3} mb={1}>
              Submitted Tests
            </Typography>
            <SubmittedTests candidate={selectedCandidate} />

            <Typography variant='h4' color='secondary' mt={3} mb={1}>
              Candidate Info
            </Typography>
            <Typography
              variant='p'
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: '1rem',
              }}
            >
              Name
            </Typography>
            <Typography
              variant='p'
              mb={1}
              sx={{
                fontSize: '1rem',
              }}
            >
              {selectedCandidate.name?.first} {selectedCandidate.name?.last}
            </Typography>
            <Typography
              variant='p'
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: '1rem',
              }}
            >
              Email
            </Typography>
            <Typography
              variant='p'
              mb={1}
              sx={{
                fontSize: '1rem',
              }}
            >
              {selectedCandidate.email}
            </Typography>
            <Typography
              variant='p'
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: '1rem',
              }}
            >
              Major
            </Typography>
            <Typography
              variant='p'
              mb={1}
              sx={{
                fontSize: '1rem',
              }}
            >
              {selectedCandidate.major}
            </Typography>
            <Typography
              variant='p'
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: '1rem',
              }}
            >
              Graduation Year
            </Typography>
            <Typography
              variant='p'
              mb={1}
              sx={{
                fontSize: '1rem',
              }}
            >
              {selectedCandidate.graduationYear}
            </Typography>
            <Typography
              variant='p'
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontSize: '1rem',
              }}
            >
              Initiation Quarter
            </Typography>
            <Typography
              variant='p'
              mb={1}
              sx={{
                fontSize: '1rem',
              }}
            >
              {selectedCandidate.initiationQuarter?.year}{' '}
              {selectedCandidate.initiationQuarter?.quarter}
            </Typography>
            {selectedCandidate.position === positions.officer ? (
              <div>
                <Typography
                  variant='p'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontSize: '1rem',
                  }}
                >
                  Committees
                </Typography>
                <CommitteeList committees={selectedCandidate.committees}/>
              </div>
            ) : null}
            <Typography variant='h4' color='secondary' mt={3}>
              Manage Candidate
            </Typography>

            <Typography variant='h4' color='secondary' mt={3}>
              Upload Headshot
            </Typography>

            <UploadHeadshot
                candidate={selectedCandidate}
                setCandidate={setSelectedCandidate}
            />


            <Grid
              container
              pt={3}
              sx={{ display: 'flex', justifyContent: 'left' }}
            >
              <Grid item xs={12} sm={3} lg={2} mb={2}>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={handleDelete}
                  sx={{ width: '100%' }}
                >
                  Delete Candidate
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

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

export default CandidateTracker;

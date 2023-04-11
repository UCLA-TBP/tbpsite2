import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
  createFilterOptions,
  Item
} from '@mui/material';
import SubmittedTests from '../components/SubmittedTests';
import { positions } from '../permissions/PermissionsUtils';
import axios from 'axios';
import _ from 'lodash';

import TestBank from '../member-services/TestBank';

const filterOptions = createFilterOptions({
  ignorecase: true,
});

const CandidateTracker = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [PDFs, setPDFs] = useState([]);

  function logPDFs() {
      axios
      .get('/api/pdf/get-all-PDFs')
      .then((res) => {
        setPDFs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(PDFs);
  }

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

  const handleSnackbarClose = (event, reason) => {
    setShowSnackbar(false);
  };

  return (
    <Container>
      <Typography variant='h2' mt={10} mb={3}>
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
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          borderRadius: '0.2rem',
        }}
        filterOptions={filterOptions}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        renderInput={(params) => {
          return <TextField {...params} />;
        }}
      />
      {selectedCandidate && (
        <>
          <Typography variant='h4' color='secondary' mt={3} mb={1}>
            Candidate Requirements
          </Typography>
          {selectedCandidate.requirements &&
            Object.entries(selectedCandidate.requirements).map(
              ([requirement, status]) => {
                return (
                  <Grid container key={requirement}>
                    <Grid item xs={5} md={2}>
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
          <button onClick={logPDFs}>click me</button>

          <Typography variant='h4' color='secondary' mt={3} mb={1}>
            Tutoring Hours
          </Typography>

          {selectedCandidate.tutoringLog && selectedCandidate.tutoringLog.map((entry, index) => (
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
          ))}

          <SubmittedTests candidate = {selectedCandidate}></SubmittedTests>

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
            Candidate Info
          </Typography>
          {Object.entries(selectedCandidate).map(([key, value]) => {
            return (
              <div key={key}>
                <Typography
                  variant='p'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontSize: '1rem',
                  }}
                >
                  {key}
                </Typography>
                <Typography
                  variant='p'
                  mb={1}
                  sx={{
                    fontSize: '1rem',
                  }}
                >
                  {JSON.stringify(value, null, 4)}
                </Typography>
              </div>
            );
          })}
        </>
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
  );
};

export default CandidateTracker;

import React, {useEffect}from 'react';
import { Grid, Container } from '@mui/material';
import { Typography } from '@mui/material';
import _ from 'lodash';

function Candidates({authenticatedUser}) {  
  useEffect(() => {console.log(authenticatedUser)},[]);

  return (
    <div>
      <Container>
        <Typography variant='h2' mt={10}>
          Candidate homepage
        </Typography>
        <Typography variant='p' mt={5}>
          Indicate your tutoring availability <a href='https://forms.gle/x8UW4tPCG9d8CfcU7'>here</a>.
        </Typography>
      </Container>
      <Container>
      {Object.entries(authenticatedUser?.requirements).map(
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
              />
            </Grid>
          </Grid>
        );
      }
      )}
      </Container>
    </div>
  );
}

export default Candidates;

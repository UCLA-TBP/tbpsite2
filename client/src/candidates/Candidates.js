import React from 'react';
import { Grid, Button, Container } from '@mui/material';
import { Typography } from '@mui/material';
import MCCheck from './MCCheck.js';

function Candidates() {
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
          <br></br>
          <MCCheck requirement = {'New Member Form'} />
          <MCCheck requirement = {'Membership Fee'} />
          <MCCheck requirement = {'General Social'} />
          <MCCheck requirement = {'AO'} />
          <MCCheck requirement = {'Social Media Post'} />
          <MCCheck requirement = {'Resume/Corporate'} />
          <MCCheck requirement = {'Candidate Quiz'} />
          <MCCheck requirement = {'Bent Polishing'} />
          <MCCheck requirement = {'Mentor/Mentee Coffee Chat'} />
          <MCCheck requirement = {'Chalking'} />
          <MCCheck requirement = {'Initiation'} />
          {/*TODO: Add all requirements, format nicely, figure out how to differentiate admin/candidate access*/}

        </Container>
      </div>
    );
}

export default Candidates;

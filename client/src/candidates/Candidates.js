import React, { useState, useEffect } from 'react';
import { Grid, Button, Container } from '@mui/material';
import { Typography } from '@mui/material';
import MCCheck from './MCCheck.js';
import RouteProtection from './../permissions/RouteProtection';
import { positions } from './../permissions/PermissionsUtils';
import axios from 'axios';

function Candidates() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    axios
      .get('/user/authenticated-user')
      .then((res) => setAuthenticatedUser(res.data.user))
      .catch((err) => setAuthenticatedUser(null));
  }, []);
  
  return (
      authenticatedUser={authenticatedUser},
      setAuthenticatedUser={setAuthenticatedUser},
      
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
        <MCCheck requirement = {'Tutoring'} />
        {/*show hours somehow*/}
        <MCCheck requirement = {'Test Bank'} />
        {/*show uploaded tests*/}
        <MCCheck requirement = {'Social Media Post'} />
        <MCCheck requirement = {'Resume/Corporate'} />
        <MCCheck requirement = {'Candidate Quiz'} />
        <MCCheck requirement = {'Bent Polishing'} />
        <MCCheck requirement = {'Mentor/Mentee Coffee Chat'} />
        <MCCheck requirement = {'Chalking'} />
        <MCCheck requirement = {'Initiation'} />

        {/*TODO: figure out how to differentiate admin/candidate access*/}

      </Container>
    </div>
  );
}

export default Candidates;

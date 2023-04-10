import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';

function TutoringSchedule() {
  return(
    <Container>
      <Typography variant = 'h2' mt = {10}>
        Tutoring Schedule
      </Typography>
      <Typography variant = 'p' mt = {5}>
        Direct any questions or concerns to TBP's tutoring chairs at <a href="mailto:uclatbp.tutoring@gmail.com">uclatbp.tutoring@gmail.com</a>. The schedule is subject to change.
        <br></br>
        Have additional questions outside of normal tutoring hours? Join our new <a href="http://bit.ly/TBPCampuswire"> TBP Tutoring Campuswire</a>  with code 4268 to get help!
        <br></br><br></br>
        <b>Location:</b><br />
          Boelter 6266S <br />
        <br></br>
        <b>Hours:</b><br />
        Monday through Friday<br />
        10AM - 4PM PST<br />
        Weeks 3 through 9<br/>
      </Typography>

      <Typography variant = 'p' mt = {5}>
        Our tutoring starts Week 3. Check back later for this quarter's schedule!
      </Typography>
    </Container>
  );
}

export default TutoringSchedule;

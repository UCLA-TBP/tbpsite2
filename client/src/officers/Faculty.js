import React from 'react';
import {Container, Typography } from '@mui/material';

function Faculty() {
  return (
    <Container>
      <Typography variant = 'h2' mt = {10}>
        Advisors & Faculty
      </Typography>
      <Typography variant = 'p' mt = {5}>
      William Goodin <u>wgoodin@g.ucla.edu</u> <br></br>
      Ann Karagozian <u>ark@seas.ucla.edu</u> <br></br>
      Aaron Meyer <u>ameyer@ucla.edu</u> <br></br>
      Carissa Eisler <u>ceisler@ucla.edu</u> <br></br>
      Jennifer Wilson <u>jenniferwilson@g.ucla.edu</u>
      </Typography>
    </Container>
    );
}

export default Faculty;

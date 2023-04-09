import { Container, Typography } from '@mui/material';
import React from 'react';

const FeatureInProgress = () => {
  return (
    <Container sx={{ paddingTop: '40vh', textAlign: 'center' }}>
      <Typography variant='h1'>
        Sorry, this feature is coming{' '}
        <span style={{ color: '#eec807' }}>soon!</span>
      </Typography>
    </Container>
  );
};

export default FeatureInProgress;

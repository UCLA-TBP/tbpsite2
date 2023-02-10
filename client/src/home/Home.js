import React from 'react';
import './Home.css';
import { Grid } from '@mui/material';

function Home() {
  return (
    <>
      <div className='background'>

      <Grid container spacing = {0} align = "right" justify = "right" direction = "column">
          <h1 className='landing-title'>
            The Honor Society for
            <br></br>
            <tg-highlight>All Engineers </tg-highlight>
            at UCLA
          </h1>
      </Grid>

      </div>

      <div id='who-we-are' style={{ position: 'absolute', top: '100vh' }}>
        WHO WE ARE
      </div>
    </>
  );
}

export default Home;

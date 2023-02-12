import React from 'react';
import './Home.css';
import { Grid } from '@mui/material';

function Home() {
  return (
    <>
      <div className='background'>

        <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="right"
        style={{ minHeight: '100vh' }}
        >
            <Grid item
            padding={10}
            >
              <h1 className='landing-title'>
                The Honor Society for
                <br></br>
                <tg-highlight>All Engineers </tg-highlight>
                at UCLA
              </h1>
            </Grid>
 
        </Grid> 

      </div>

      <div id='who-we-are' style={{ position: 'absolute', top: '100vh' }}>
        WHO WE ARE
      </div>
    </>
  );
}

export default Home;

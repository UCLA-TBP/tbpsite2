import React from 'react';
import './Home.css';
import { Grid } from '@mui/material';

function Home() {
  return (
    <body>
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

        <section className='scroll-down'>
          <a href="/#intro">
            ADD ICON HERE
          </a>
        </section>

      </div>
      
      <div className='section-secondary'>
        <div id='intro' className='section-container'>
          <h1 className='header'>
            Who We Are
          </h1>
          <p className='paragraph'>
            Tau Beta Pi is the national honor society representing the entire engineering profession, and the California Epsilon chapter has served the UCLA community since 1952. By recognizing professional achievement, as well as service, Tau Beta Pi strives to uphold its creed of “Integrity and Excellence in Engineering.”
          </p>
        </div>
        <hr></hr>

        <div>
          BECOMING A MEMBER
        </div>
        <hr></hr>

        <div>
          TUTORING
        </div>
        <hr></hr>

        <div>
          ACTIVITIES
        </div>
        <hr></hr>

        <div>
          CONTACTS AND OTHER LINKS
        </div>

      </div>
      
    </body>
  );
}

export default Home;

import React from 'react';
import './Home.css';
import { Grid, Button } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // white
    primary: {
      main: '#ffffff',
    },
    // gold/yellow
    secondary: {
      main: '#eec807',
    },
    // dark grey
    custom: {
      main: '#222',
    },
  },
});

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
          <p id='who-we-are-text' className='paragraph'>
            Tau Beta Pi is the national honor society representing the entire engineering profession, and the California Epsilon chapter has served the UCLA community since 1952. By recognizing professional achievement, as well as service, Tau Beta Pi strives to uphold its creed of “Integrity and Excellence in Engineering.”
          </p>
        </div>
        <hr></hr>

        <div className='section-container'>
          <h1 className='header'>
            Becoming a Member
          </h1>
          <p className='paragraph'>
            Invitations for membership may be extended to undergraduate engineering majors who are in the top:
          </p>
          <div>placeholder</div>
          <p className='paragraph'>
          Candidates must also have completed at least 28 units from UCLA to be invited in the Fall or Spring. Junior and senior class designation are based on units completed per the&nbsp;
           <a href="https://registrar.ucla.edu/registration-classes/enrollment-policies/class-levels">UCLA Registrar's Office</a>. For Fall invitations, grades and units obtained up until the end of Summer Session A - 6 Weeks will be considered.
          </p>
          <p className='paragraph'>
          Once eligible and candidacy is confirmed, initiates must demonstrate their commitment to TBP’s values. This is done through weekly volunteering, service, and several TBP traditions like polishing the Bent outside Boelter Hall.
          </p>
          <p className='paragraph'>
          After officially initiating, members have the option to continue their involvement by either joining the officer board or becoming a distinguished active member. Both receive discounts on TBP graduation regalia. Please follow links below for more details on induction, requirements, and officership.
          </p>

          <ThemeProvider theme={theme}>
            <Grid
            container
            spacing={5}
            direction="row"
            alignItems="center"
            justifyContent="center"
            >
              
              <Grid item>
                <a href="https://docs.google.com/document/d/17oQJGGIGzcz9VtFnot_9rObTi4uyO117aAPtr_z0jjk/edit"
                   className="no-underline">
                  <Button color="secondary" variant="outlined">Candidate Packet</Button>
                </a>
              </Grid>

              {/* The following href link should take you to the requirements page, not sure if this is setup yet */}
              <Grid item>
                <a href="/requirements/"
                   className="no-underline">
                  <Button color="secondary" variant="outlined">Induction Requirements</Button>
                </a>
              </Grid>
              
              <Grid item>
                <a href="https://docs.google.com/presentation/d/1QIRI2plBd81QsNovjsXyeII12dIHrJie0B3EFORbUjA/edit#slide=id.p"
                   className="no-underline">
                  <Button color="secondary" variant="outlined">Orientation Presentation</Button>
                </a>
              </Grid>
              
              <Grid item>
                <a href="https://tbp.seas.ucla.edu/media/files/Officer-Positions.pdf"
                   className="no-underline">
                  <Button color="secondary" variant="outlined">Officer Positions</Button>
                </a>
              </Grid>
            </Grid>
          </ThemeProvider>

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

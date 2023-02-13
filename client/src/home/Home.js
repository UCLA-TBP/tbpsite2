import React from 'react';
import './Home.css';
import { Grid, Button } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
        direction='row'
        alignItems='center'
        justifyContent='right'
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
          <a href='/#intro'>
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
           <a href='https://registrar.ucla.edu/registration-classes/enrollment-policies/class-levels'>UCLA Registrar's Office</a>. For Fall invitations, grades and units obtained up until the end of Summer Session A - 6 Weeks will be considered.
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
            direction='row'
            alignItems='center'
            justifyContent='center'
            >
              
              <Grid item>
                <a href='https://docs.google.com/document/d/17oQJGGIGzcz9VtFnot_9rObTi4uyO117aAPtr_z0jjk/edit'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>Candidate Packet</Button>
                </a>
              </Grid>

              {/* The following href link should take you to the requirements page, not sure if this is setup yet */}
              <Grid item>
                <a href='/requirements/'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>Induction Requirements</Button>
                </a>
              </Grid>
              
              <Grid item>
                <a href='https://docs.google.com/presentation/d/1QIRI2plBd81QsNovjsXyeII12dIHrJie0B3EFORbUjA/edit#slide=id.p'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>Orientation Presentation</Button>
                </a>
              </Grid>
              
              <Grid item>
                <a href='https://tbp.seas.ucla.edu/media/files/Officer-Positions.pdf'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>Officer Positions</Button>
                </a>
              </Grid>
            </Grid>
          </ThemeProvider>

        </div>


        <hr></hr>

        <div className='section-container'>
          <h1 className='header'>
            Tutoring
          </h1>
          <p className='paragraph'>
            We offer free drop-in tutoring in all STEM courses at our office (Boelter 6266). Feel free to stop by for homework help or pre-exam practice. Please check the schedule below for course availability.
          </p>
          <p className='paragraph'>
            Hours: Mon-Fri, 10 am - 4 pm, Weeks 3 - 9
          </p>

          <ThemeProvider theme={theme}>
            <Grid
            container
            spacing={5}
            direction='row'
            alignItems='center'
            justifyContent='center'
            >
              
              <Grid item>
                <a href='/schedule/'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>SCHEDULE</Button>
                </a>
              </Grid>

              <Grid item>
                <a href='/reviewsheets/'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>REVIEW SHEETS</Button>
                </a>
              </Grid>
              
              <Grid item>
                <a href='/tutoring/feedback/'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>FEEDBACK</Button>
                </a>
              </Grid>
              
              <Grid item>
                <a href='/tutoring/log_hours/'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>LOG HOURS</Button>
                </a>
              </Grid>
            </Grid>
          </ThemeProvider>
        </div>
        <hr></hr>

        <div className='section-container'>
          <h1 className='header'>
            Activities
          </h1>

          <iframe src="https://calendar.google.com/calendar/embed?src=lv5b95c37926e08bbs8jj20n38%40group.calendar.google.com&ctz=America%2FLos_Angeles" 
                  width="100%" height="600px" 
                  frameborder="0">
          </iframe>

          <ThemeProvider theme={theme}>
            <Grid
            container
            spacing={5}
            direction='row'
            alignItems='center'
            justifyContent='center'
            >
              
              <Grid item>
                <Card sx={{ maxWidth: 500 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://tbp.seas.ucla.edu/static/img/career_guidance.jpg"
                    />
                    <CardContent className='card-background'>
                      <h2 className='card-title'>Career Guidance</h2>
                      <p className='card-text'>With so many accomplished members, TBP is dedicated to assisting the next generation of engineers reach their professional goals. Every year, we host Internship Insider Night featuring a panel of students sharing their summer internship experience and job hunting advice. We also helped plan the 2018 Dean’s Student Showcase, an exclusive networking event for honor society and Dean’s diversity group members.</p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item>
                <Card sx={{ maxWidth: 500 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://tbp.seas.ucla.edu/static/img/academic_guidance1.jpg"
                    />
                    <CardContent className='card-background'>
                      <h2 className='card-title'>Academic Outreach</h2>
                      {/* I know these line breaks are so ugly, but it was an easy way to make all cards the same size :/ */}
                      <p className='card-text'>In addition to TBP’s drop-in tutoring program, we also host larger review sessions for Math and Physics courses in preparation for midterms and finals. 
                        <br></br> <br></br> <br></br> <br></br>
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item>
                <Card sx={{ maxWidth: 500 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://tbp.seas.ucla.edu/static/img/emcc.png"
                    />
                    <CardContent className='card-background'>
                      <h2 className='card-title'>EMCC</h2>
                      <p className='card-text'>Engineering Minds Cultivating Creativity (EMCC) is a weekly science program catered to students at Nora Sterry Elementary School. The main goal of this program is to cultivate a love of math and science in young schoolchildren, preparing them for careers in STEM fields. We have centered the EMCC curriculum on higher level math and science concepts paired with hands-on projects.</p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

              <Grid item>
                <Card sx={{ maxWidth: 500 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200"
                      image="https://tbp.seas.ucla.edu/static/img/competition1.jpg"
                    />
                    <CardContent className='card-background'>
                      <h2 className='card-title'>Competitions</h2>
                      <p className='card-text'>Every year, TBP hosts competitions that exercise on-the-fly thinking and creativity. Our biggest event is our annual Rube Goldberg Competition in the winter, which challenges teams to construct a machine out of seemingly random collection of materials to perform a simple task in the most complicated way possible. We also host other events throughout the year like the Cardboard Boat Race.</p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>

            </Grid>
          </ThemeProvider>



        </div>
        <hr></hr>

        <div id='last-section' className='section-container'>
          <h1 className='header'>
            Contacts and Other Links
          </h1>

          <p className='paragraph'>
            Location: 6266 Boelter Hall
          </p> 

          <p className='paragraph'>
            Email:&nbsp;
            <a id='email-link' className='no-underline' href='mailto:ucla.tbp@gmail.com'>ucla.tbp@gmail.com</a>
          </p>

          <ThemeProvider theme={theme}>
            <Grid
            container
            spacing={5}
            direction='row'
            alignItems='center'
            justifyContent='center'
            >
              
              <Grid item>
                <a href='/officers/'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>OFFICERS</Button>
                </a>
              </Grid>

              <Grid item>
                <a href='/faculty/'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>ADVISORS AND FACULTY</Button>
                </a>
              </Grid>
              
              <Grid item>
                <a href='/donate/'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>DONATE</Button>
                </a>
              </Grid>
              
              <Grid item>
                <a href='https://www.facebook.com/tbp.ucla'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>FACEBOOK</Button>
                </a>
              </Grid>

              <Grid item>
                <a href='https://www.instagram.com/uclatbp'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>INSTAGRAM</Button>
                </a>
              </Grid>

              <Grid item>
                <a href='https://www.tbp.org/home.cfm'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>TBP NATIONAL</Button>
                </a>
              </Grid>

              <Grid item>
                <a href='https://samueli.ucla.edu/'
                   className='no-underline'>
                  <Button color='secondary' variant='outlined'>UCLA ENGINEERING</Button>
                </a>
              </Grid>

            </Grid>
          </ThemeProvider>

        </div>

      </div>
      
    </body>
  );
}

export default Home;

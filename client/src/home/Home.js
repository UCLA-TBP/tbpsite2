import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { Grid, Button, Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import EventsCalendar from '../components/EventsCalendar';
import styled from '@emotion/styled';

const FloatingContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.custom.main,
  [theme.breakpoints.up('xs')]: {
    marginBottom: '20px',
    borderRadius: '0',
  },
  [theme.breakpoints.up('sm')]: {
    marginBottom: '100px',
    borderRadius: '12px',
  },
}));

const sectionIds = [
  'who-we-are',
  'becoming-a-member',
  'tutoring',
  'event-calendar',
  'activities',
  'contact',
];

const maxOpacity = 1;

function Home() {
  const [scrollPos, setScrollPos] = useState(0);
  const sectionMap = useRef({});
  const [sectionOpacities, setSectionOpacities] = useState({});

  const handleScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setScrollPos(winScroll);

    const newOpacities = {};
    Object.entries(sectionMap.current).forEach((entry) => {
      const id = entry[0];
      const ele = entry[1].getBoundingClientRect();
      const topDist = window.innerHeight / 2 - ele.top;
      const botDist = window.innerHeight / 2 - ele.bottom;
      var centerDist = 0;
      if (Math.sign(topDist) === Math.sign(botDist)) {
        centerDist = Math.min(Math.abs(topDist), Math.abs(botDist));
      }
      const opacity = Math.max(
        0,
        maxOpacity -
          Math.pow(0.5 * window.innerHeight, -2) * Math.pow(centerDist, 2)
      );
      newOpacities[id] = opacity;
      // const newScales = update(sectionScales, {
      //   [id]: { $set: scale },
      // });
      // setSectionScales(newScales);
    });
    setSectionOpacities(newOpacities);
  };

  useEffect(() => {
    sectionIds.forEach((id) => {
      sectionMap.current[id] = document.getElementById(id);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className='background'
        onClick={() => {
          console.log('bg click');
        }}
      >
        {/* <Grid
          container
          spacing={0}
          direction='row'
          alignItems='center'
          justifyContent='right'
          style={{ minHeight: '100vh', textAlign: 'right' }}
        >
          <Grid item pr={{ sm: '10%', xl: '20%' }}>
            <Typography variant='h1'>
              The Honor Society for
              <br></br>
              <Typography variant='highlight'>All Engineers </Typography>
              at UCLA
            </Typography>
          </Grid> */}
        {/* </Grid> */}

        <Container
          disableGutters
          maxWidth='100%'
          sx={{
            position: 'sticky',
            top: {
              xs: `${37 - scrollPos / 100}%`,
              md: `${40 - scrollPos / 100}%`,
            },
            textAlign: 'right',
            paddingRight: { sm: '10vw', xl: '20vw' },
            opacity: Math.max(0, 1.4 - scrollPos / 400),
          }}
        >
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '200%', sm: '250%', md: '350%' },
              textAlign: { xs: 'center', md: 'right' },
              lineHeight: { xs: '2', md: '1.2' },
            }}
          >
            The Honor Society for
            <br></br>
            <Typography variant='highlight'>All Engineers </Typography>
            at UCLA
          </Typography>
        </Container>
        <section
          className='scroll-down'
          style={{
            position: 'sticky',
            top: `${90 - scrollPos / 25}%`,
            opacity: Math.max(0, 1.4 - scrollPos / 100),
          }}
          onClick={() => {
            console.log('clicked');
          }}
        >
          {/* <a href='/#who-we-are'>
            <KeyboardArrowDownIcon />
          </a>
           */}
          <div className='arrow arrow-first' />
          <div className='arrow arrow-second' />
        </section>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '20vh',
          height: '80vh',
          width: '100%',
          cursor: 'pointer',
        }}
        onClick={() => {
          const whoWeAreEle = document.getElementById('who-we-are');
          whoWeAreEle.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
          });
        }}
      ></div>

      <div className='section-secondary'>
        <FloatingContainer
          id='who-we-are'
          className='section-container'
          sx={{
            // transform: `scale(${sectionScales['who-we-are']})`,
            opacity: `${sectionOpacities['who-we-are']}`,
          }}
        >
          <Typography variant='h2' mb={'20px'}>
            Who We Are
          </Typography>
          <Typography variant='p' mb={'20px'} id='who-we-are-text'>
            Tau Beta Pi is the national honor society representing the entire
            engineering profession, and the California Epsilon chapter has
            served the UCLA community since 1952. By recognizing professional
            achievement, as well as service, Tau Beta Pi strives to uphold its
            creed of “Integrity and Excellence in Engineering.”
          </Typography>
        </FloatingContainer>

        {/* <Divider><Chip variant='outlined' label='' /></Divider> */}

        <FloatingContainer
          id='awards'
          className='section-container'
          sx={{
            opacity: `${sectionOpacities['awards']}`,
          }}
        >
          <Typography variant='h2' mb={'20px'}>
            Awards
          </Typography>
          <Typography variant='p' mb={'20px'}>
            Lorem ipsum dolor sit amet consecutor.
          </Typography>
        </FloatingContainer>

        <FloatingContainer
          className='section-container'
          id='becoming-a-member'
          sx={{
            // transform: `scale(${sectionScales['becoming-a-member']})`,
            opacity: `${sectionOpacities['becoming-a-member']}`,
          }}
        >
          <Typography variant='h2' mb={'20px'}>
            Becoming a Member
          </Typography>
          <Typography variant='p' mb={'20px'}>
            Invitations for membership may be extended to undergraduate
            engineering majors who are in the top 1/5 of Senior Class or 1/8 of
            Junior Class.
          </Typography>
          <Typography variant='p' mb={'20px'}>
            Candidates must also have completed at least 28 units from UCLA to
            be invited in the Fall or Spring. Junior and senior class
            designation are based on units completed per the&nbsp;
            <a href='https://registrar.ucla.edu/registration-classes/enrollment-policies/class-levels'>
              UCLA Registrar's Office
            </a>
            . For Fall invitations, grades and units obtained up until the end
            of Summer Session A - 6 Weeks will be considered.
          </Typography>
          <Typography variant='p' mb={'20px'}>
            Once eligible and candidacy is confirmed, initiates must demonstrate
            their commitment to TBP’s values. This is done through weekly
            volunteering, service, and several TBP traditions like polishing the
            Bent outside Boelter Hall.
          </Typography>
          <Typography variant='p' mb={'20px'}>
            After officially initiating, members have the option to continue
            their involvement by either joining the officer board or becoming a
            distinguished active member. Both receive discounts on TBP
            graduation regalia. Please visit the links below for more details on
            induction and requirements.
          </Typography>

          <Grid
            container
            spacing={5}
            pt={4}
            direction='row'
            alignItems='center'
            justifyContent='center'
          >
            <Grid item>
              <Button
                color='secondary'
                variant='outlined'
                href='https://docs.google.com/document/d/1t1796RIZrXh7yJmIeSQ4lMdsVNo1kbZGjuxT5Xcwlrk/edit?usp=sharing'
                size='large'
              >
                Candidate Packet
              </Button>
            </Grid>
            {/*             <Grid item>
              <Button
                color='secondary'
                variant='outlined'
                href='https://docs.google.com/presentation/d/1hDlnXMIfnnxsmA8eR5ZJZ1gmQ4CWpuiqnSHJ2bNpJDQ/edit?usp=sharing'
                size='large'
              >
                Orientation Presentation
              </Button>
            </Grid> */}
          </Grid>
        </FloatingContainer>

        <FloatingContainer
          className='section-container'
          id='tutoring'
          sx={{
            // transform: `scale(${sectionScales['tutoring']})`,
            opacity: `${sectionOpacities['tutoring']}`,
          }}
        >
          {/* <h1 className='header'>Tutoring</h1> */}
          <Typography variant='h2' mb={'20px'}>
            Tutoring
          </Typography>
          <Typography variant='p' mb={'20px'}>
            We offer free drop-in tutoring in all STEM courses at our office
            (Boelter 6266). Feel free to stop by for homework help or pre-exam
            practice. Please check the schedule below for course availability.
          </Typography>
          <Typography variant='p' mb={'20px'}>
            Hours: Mon-Fri, 10 am - 4 pm, Weeks 3 - 9
          </Typography>
          {/*<Typography variant='p' mb={'20px'}>
            Tutoring will be on Zoom at the following link while classes are online:
            <br></br>
            <a href='https://ucla.zoom.us/j/92285065964'>
              https://ucla.zoom.us/j/92285065964
            </a>
        </Typography>*/}


          <Grid
            container
            spacing={5}
            pt={4}
            direction='row'
            alignItems='center'
            justifyContent='center'
          >
            <Grid item>
              <Button
                size='large'
                href='tutoring/schedule/'
                color='secondary'
                variant='outlined'
              >
                SCHEDULE
              </Button>
            </Grid>

            {/* <Grid item>
              <Button
                href='tutoring/reviewsheets/'
                color='secondary'
                variant='outlined'
                size='large'
              >
                REVIEW SHEETS
              </Button>
            </Grid> */}

            <Grid item>
              <Button
                href='https://forms.gle/sburNuSv83ekaTTf8'
                color='secondary'
                variant='outlined'
                size='large'
              >
                FEEDBACK
              </Button>
            </Grid>

            {/* <Grid item>
              <Button
                href='/tutoring/log_hours/'
                color='secondary'
                variant='outlined'
                size='large'
              >
                LOG HOURS
              </Button>
            </Grid> */}
          </Grid>
        </FloatingContainer>

        {/* <Divider><Chip variant='outlined' label='' /></Divider> */}

        <FloatingContainer
          className='section-container'
          id='event-calendar'
          sx={{
            // transform: `scale(${sectionScales['event-calendar']})`,
            opacity: `${sectionOpacities['event-calendar']}`,
          }}
        >
          {/* <h1 className='header'>Activities</h1> */}
          <Typography variant='h2' mb={'20px'}>
            Event Calendar
          </Typography>

          <EventsCalendar />
        </FloatingContainer>

        <FloatingContainer
          className='section-container'
          id='activities'
          sx={{
            // transform: `scale(${sectionScales['activities']})`,
            opacity: `${sectionOpacities['activities']}`,
          }}
        >
          <Typography variant='h2' mb={'20px'}>
            Activities
          </Typography>
          <Grid
            container
            spacing={5}
            pt={4}
            direction='row'
            alignItems='center'
            justifyContent='center'
          >
            <Grid item>
              <Card sx={{ maxWidth: 500 }}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='200'
                    image={`${process.env.PUBLIC_URL}/home/careerguidance.png`}
                  />
                  <CardContent className='card-background'>
                    <h2 className='card-title'>Career Guidance</h2>
                    <p className='card-text'>
                      With so many accomplished members, TBP is dedicated to
                      assisting the next generation of engineers reach their
                      professional goals. We host career fairs and offer
                      information sessions to help connect members to employers
                      as well as resume workshops and support to prepare for
                      graduate school.
                      <br></br> <br></br>
                    </p>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item>
              <Card sx={{ maxWidth: 500 }}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='200'
                    image={`${process.env.PUBLIC_URL}/home/ao.jpeg`}
                  />
                  <CardContent className='card-background'>
                    <h2 className='card-title'>Academic Outreach</h2>
                    {/* I know these line breaks are so ugly, but it was an easy way to make all cards the same size :/ */}
                    <p className='card-text'>
                      In addition to TBP’s drop-in tutoring program, we also
                      host larger review sessions for Math and Physics courses
                      in preparation for midterms and finals.
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
                    component='img'
                    height='200'
                    image={`${process.env.PUBLIC_URL}/home/emcc.png`}
                  />
                  <CardContent className='card-background'>
                    <h2 className='card-title'>EMCC</h2>
                    <p className='card-text'>
                      In EMCC, we aim to inspire younger students to follow a
                      career path in STEM. We do this by putting together
                      hands-on science experiments to promote STEM engagement.
                      Recently, we have been partnering with Brawerman
                      elementary to host spring science fairs. For the 2023-2024
                      school year, we hope to expand our reach to serve
                      underserved elementary schools in our community.
                    </p>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item>
              <Card sx={{ maxWidth: 500 }}>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    height='200'
                    image={`${process.env.PUBLIC_URL}/home/competition.png`}
                  />
                  <CardContent className='card-background'>
                    <h2 className='card-title'>Competitions</h2>
                    <p className='card-text'>
                      Every year, TBP hosts competitions that exercise
                      on-the-fly thinking and creativity. Our biggest event is
                      our annual Rube Goldberg Competition in the winter, which
                      challenges teams to construct a machine out of seemingly
                      random collection of materials to perform a simple task in
                      the most complicated way possible. We also host other
                      events throughout the year like the Cardboard Boat Race.
                    </p>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </FloatingContainer>

        {/* <Divider><Chip variant='outlined' label='' /></Divider> */}

        <FloatingContainer
          id='contact'
          className='section-container last-section'
          sx={{
            // transform: `scale(${sectionScales['contact']})`,
            opacity: `${sectionOpacities['contact']}`,
          }}
        >
          {/* <h1 className='header'>Contacts and Other Links</h1> */}
          <Typography variant='h2' mb={'20px'}>
            Contacts and Other Links
          </Typography>

          <Typography variant='p' mb={'20px'}>
            Location: 6266 Boelter Hall
          </Typography>

          <Typography variant='p' mb={'20px'}>
            Email:&nbsp;
            <a
              id='email-link'
              className='no-underline'
              href='mailto:ucla.tbp@gmail.com'
            >
              ucla.tbp@gmail.com
            </a>
          </Typography>

          <Grid
            container
            spacing={5}
            pt={4}
            direction='row'
            alignItems='center'
            justifyContent='center'
          >
            <Grid item>
              <Button href='/officers/' color='secondary' variant='outlined'>
                OFFICERS
              </Button>
            </Grid>

            <Grid item>
              <Button href='/faculty/' color='secondary' variant='outlined'>
                FACULTY
              </Button>
            </Grid>

            {/* <Grid item>
              <Button href='/donate/' color='secondary' variant='outlined'>
                DONATE
              </Button>
            </Grid> */}

            <Grid item>
              <Button
                href='https://www.facebook.com/tbp.ucla'
                color='secondary'
                variant='outlined'
              >
                FACEBOOK
              </Button>
            </Grid>

            <Grid item>
              <Button
                href='https://www.instagram.com/uclatbp'
                color='secondary'
                variant='outlined'
              >
                INSTAGRAM
              </Button>
            </Grid>

            <Grid item>
              <Button
                href='https://www.tbp.org/home.cfm'
                color='secondary'
                variant='outlined'
              >
                TBP NATIONAL
              </Button>
            </Grid>

            <Grid item>
              <Button
                href='https://samueli.ucla.edu/'
                color='secondary'
                variant='outlined'
              >
                UCLA HSSEAS
              </Button>
            </Grid>

            <Grid item>
              <Button
                href='https://forms.gle/AQau2zmN1wug2GKa7'
                color='secondary'
                variant='outlined'
              >
                WEBSITE FEEDBACK
              </Button>
            </Grid>
          </Grid>
        </FloatingContainer>
      </div>
    </>
  );
}

export default Home;

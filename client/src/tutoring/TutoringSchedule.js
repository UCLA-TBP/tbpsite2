import React from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

function TutoringSchedule() {
  return (
    <Container>
      <Typography variant="h2" mt={10}>
        Tutoring Schedule
      </Typography>
      {/*<Typography variant='p' mt={3}>
        <span style={{ fontWeight: 'bold', color: 'white' }}>IMPORTANT: </span>
        While classes are online (currently Week 6 Wednesday through Friday), tutoring will be held on Zoom!
      </Typography>
      <Box
        sx={{
          backgroundColor: 'black',
          borderRadius: '12px',
          display: 'inline-block',
        }}
        p={2}
        mt={2}
      >
        <Typography variant='p' color='white'>
          Zoom:{' '}
          <a href='https://ucla.zoom.us/j/92285065964'>
            https://ucla.zoom.us/j/92285065964
          </a>
        </Typography>
        <Typography variant='p' color='white'>
          Meeting ID: 922 8506 5964
        </Typography>
      </Box>
      */}
      <Typography variant="p" mt={2}>
        Direct any questions or concerns to TBP's tutoring chairs at{" "}
        <a href="mailto:uclatbp.tutoring@gmail.com">
          uclatbp.tutoring@gmail.com
        </a>
        . The schedule is subject to change.
        <br></br>
        Have additional questions outside of normal tutoring hours? Join our new{" "}
        <a href="http://bit.ly/TBPCampuswire"> TBP Tutoring Campuswire</a> with
        code 4268 to get help!
        <br></br>
        <br></br>
        <b>Location:</b>
        <br />
        Boelter 6266S <br />
        <br></br>
        <b>Hours:</b>
        <br />
        Monday through Friday
        <br />
        10AM - 4PM PST
        <br />
        Weeks 3 through 9<br />
      </Typography>

      {/*<Typography variant='p' mt={5}>
        Our tutoring starts <Typography variant='highlight'> Week 3</Typography>
        . Check back later for this quarter's schedule!
      </Typography>*/}
      <br></br>
      <iframe
        title="tutoringSchedule"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06q96LvUtBTtL1yl5Zazaasi_Gs640f3kL8mdH1Ai6kuMy4OsN0uaUG__h79BL691W7L0M7ZeQ-gY/pubhtml?gid=961529905&amp;single=true&amp;widget=true&amp;headers=false"
        width="90%"
        height="530"
        frameBorder="0"
      ></iframe>
    </Container>
  );
}

export default TutoringSchedule;

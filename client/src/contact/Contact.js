import React from "react";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Button } from '@mui/material';
import { Grid } from '@mui/material'


function Contact() {
  return (
    <Container
          id="contact"
          className="section-container last-section"
        >
          {/* <h1 className='header'>Contacts and Other Links</h1> */}
          <Typography variant="h2" mb={"20px"}>
            Contacts and Other Links
          </Typography>

          <Typography variant="p" mb={"20px"}>
            Location: 6266 Boelter Hall
          </Typography>

          <Typography variant="p" mb={"20px"}>
            Email:&nbsp;
            <a
              id="email-link"
              className="no-underline"
              href="mailto:ucla.tbp@gmail.com"
            >
              ucla.tbp@gmail.com
            </a>
          </Typography>

          <Grid
            container
            spacing={5}
            pt={4}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <Button href="/officers/" color="secondary" variant="outlined">
                OFFICERS
              </Button>
            </Grid>

            <Grid item>
              <Button href="/faculty/" color="secondary" variant="outlined">
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
                href="https://www.facebook.com/tbp.ucla"
                color="secondary"
                variant="outlined"
              >
                FACEBOOK
              </Button>
            </Grid>

            <Grid item>
              <Button
                href="https://www.instagram.com/uclatbp"
                color="secondary"
                variant="outlined"
              >
                INSTAGRAM
              </Button>
            </Grid>

            <Grid item>
              <Button
                href="https://www.tbp.org/home.cfm"
                color="secondary"
                variant="outlined"
              >
                TBP NATIONAL
              </Button>
            </Grid>

            <Grid item>
              <Button
                href="https://samueli.ucla.edu/"
                color="secondary"
                variant="outlined"
              >
                UCLA HSSEAS
              </Button>
            </Grid>

            <Grid item>
              <Button
                href="https://forms.gle/y5bZUNxvtAY4Y6Ws6"
                color="secondary"
                variant="outlined"
              >
                WEBSITE FEEDBACK
              </Button>
            </Grid>
          </Grid>
        </Container>
    
  );
}

export default Contact;

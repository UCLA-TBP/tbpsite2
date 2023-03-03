import React from 'react';
import {Button, 
        Grid,
        Typography} from '@mui/material';

function Officers() {
  return (
    <div>
      <Grid 
        container 
        spacing = {20} 
        direction = 'row'
        justifyContent = 'left'
        style={{ minHeight: '20vh'}}
        >
        <Grid item>
          <Typography variant = "h1">Contact</Typography>
          <Typography variant = "p">For any questions or comments, feel free to email us at
            <a href="mailto:ucla.tbp@gmail.com">ucla.tbp@gmail.com</a>. </Typography>
          <Typography variant = "p">Having issues with the site? Send an email to the webmasters: <a
            href="mailto:uclatbp.webmaster@gmail.com">uclatbp.webmaster@gmail.com</a>.</Typography>
          <Typography variant = "p">You can also stop by the Tau Beta Pi tutoring room on the 6th floor of Boelter (Room 6266) if you want to
            say hi!</Typography>
        </Grid>
      </Grid>
    </div>
    
/*
    <div className='background'>
    <Grid
      container
      spacing={0}
      direction='row'
      alignItems='right'
      justifyContent='left'
      style={{ minHeight: '100vh' }}
    >
      <Grid item pr={'10%'}>
        <Typography variant='h1'>
          The Honor Society for
          <br></br>
          <Typography variant='highlight'>All Engineers </Typography>
          at UCLA
        </Typography>
      </Grid>
    </Grid>
  </div>*/
  
  );
}

export default Officers;

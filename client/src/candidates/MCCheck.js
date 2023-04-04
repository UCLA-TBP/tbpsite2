import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function MCCheck({requirement}) {
  return (
    //maybe just make it plain text and add text color parameter
    <FormGroup>     
      <FormControlLabel disabled control={<Checkbox />} label={requirement} />
    </FormGroup>
  );
}

export default MCCheck;

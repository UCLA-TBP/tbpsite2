import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import _ from 'lodash';

const DistinguishedActiveMemberReqs = ({ requirements, selectedCandidate, setSelectedCandidate }) => {
  return (
    <div>
      {Object.entries(requirements).map(([requirement, status]) => (
        <Grid container key={requirement}>
          <Grid item xs={9} md={2} sx={{ marginLeft: '20px' }}>
            <Typography variant='p' color='primary' sm={3} sx={{ fontSize: '1rem', width: '15rem' }}>
              {_.startCase(requirement)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <input
              id={requirement}
              type='checkbox'
              checked={status}
              onChange={(e) => {
                setSelectedCandidate({
                  ...selectedCandidate,
                  distinguishedActiveMember: {
                    ...selectedCandidate.distinguishedActiveMember,
                    [requirements === selectedCandidate.distinguishedActiveMember.quarterOneRequirements
                      ? 'quarterOneRequirements'
                      : 'quarterTwoRequirements']: {
                      ...requirements,
                      [e.target.id]: e.target.checked,
                    },
                  },
                });
              }}
            />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default DistinguishedActiveMemberReqs;
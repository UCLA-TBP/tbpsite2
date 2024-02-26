import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import _ from 'lodash';

export const CommitteeList = ({ committees }) => {

    const selectedCommittees = Object.keys(committees)
      .filter(committee => committees[committee]);
  
    return (
      <Typography
        variant='p'
        mb={1}
        sx={{
          fontSize: '1rem',
        }}
      >
        {selectedCommittees.length > 0 ? (
          selectedCommittees.map((committee, index) => (
            <React.Fragment key={committee}>
              {committee}
              {index < selectedCommittees.length - 1 && ', '}
            </React.Fragment>
          ))
        ) : (
          "None"
        )}
      </Typography>
    );
};

export const OfficerCommitteeSelector = ({ committeeOptions, selectedCandidate, setSelectedCandidate }) => {
  
  return (
    <div>
      {Object.entries(committeeOptions).map(([committee, status]) => (
        <Grid container key={committee}>
          <Grid item xs={9} md={2} sx={{ marginLeft: '20px' }}>
            <Typography variant='p' color='primary' sm={3} sx={{ fontSize: '1rem', width: '15rem' }}>
              {_.startCase(committee)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <input
              id={committee}
              type='checkbox'
              checked={status}
              onChange={(e) => {
                setSelectedCandidate({
                  ...selectedCandidate,
                  committees: {
                    ...selectedCandidate.committees,
                    ...committeeOptions,
                    [e.target.id]: e.target.checked,
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
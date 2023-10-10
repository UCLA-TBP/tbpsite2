import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  alpha,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  styled,
  Button,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Container } from '@mui/material';
import TBPBackground from '../components/TBPBackground';
import _ from 'lodash';

function CandidateSpreadsheet() {
  const [candidates, setCandidates] = useState([]);
  const [displayedCandidates, setDisplayedCandidates] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const HeaderCell = styled(TableCell)(({ theme }) => ({
    padding: '10px',
    align: 'right',
    textAlign: 'center',
    backgroundColor: theme.palette.custom.main,
    color: theme.palette.primary.main,
    borderRight: '1px dashed ' + alpha(theme.palette.custom2.main, 0.5),
  }));

  const Cell = styled(TableCell)(({ theme }) => ({
    padding: '0',
    align: 'right',
    borderRight: '1px dashed ' + alpha(theme.palette.custom2.main, 0.5),
  }));

  useEffect(() => {
    async function fetchCandidates() {
      const response = await axios.get('/api/user/get-candidates');
      setDisplayedCandidates(response.data);
      setCandidates(response.data);
      setIsLoaded(true);
    }
    fetchCandidates();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TBPBackground />
      <Container
        sx={{
          padding: { xs: '80px 0 24px' },
          height: '100vh',
          minWidth: '95vw',
          display: 'flex',
          flexFlow: 'column',
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.custom.main, 0.95),
            borderRadius: '12px',
            padding: '24px 32px 32px',
          }}
          mb={3}
        >
          <Typography
            variant='h2'
            color='primary'
            sx={{
              fontWeight: 'bold',
            }}
            mb={1.5}
          >
            Candidate Spreadsheet
          </Typography>
          <Typography variant='p' color='custom2' mb={1}>
            Filter by email, name, major, or initiation quarter (e.g. "spring
            2023")
          </Typography>
          <input
            type='text'
            id='query-input'
            style={{
              fontSize: '1.2rem',
              marginRight: '12px',
              // maxWidth: { xs: '160px', sm: 'auto' },
              maxWidth: '54%',
            }}
          />
          <Button
            color='secondary'
            variant='contained'
            sx={{
              width: '100px',
              height: '30px',
              marginBottom: '4px',
              marginRight: '12px',
            }}
            onClick={() => {
              const query = document
                .getElementById('query-input')
                .value.toLowerCase();
              setDisplayedCandidates(
                candidates?.filter((candidate) => {
                  if (
                    (candidate.name?.first + ' ' + candidate.name?.last)
                      .toLowerCase()
                      .includes(query)
                  ) {
                    return true;
                  }
                  if (candidate.email.toLowerCase().includes(query)) {
                    return true;
                  }

                  let queryInitiationQuarter = query.match(/^[a-zA-Z]+/);
                  if (queryInitiationQuarter) {
                    queryInitiationQuarter = _.capitalize(
                      queryInitiationQuarter[0]
                    );
                  }
                  let queryInitiationYear = query.match(/[0-9]+$/);
                  if (queryInitiationYear) {
                    queryInitiationYear = parseInt(queryInitiationYear[0]);
                  }
                  console.log('compare');
                  console.log(queryInitiationQuarter, queryInitiationYear);
                  console.log(
                    candidate.initiationQuarter.quarter,
                    candidate.initiationQuarter.year
                  );
                  if (
                    candidate.initiationQuarter.quarter ===
                      queryInitiationQuarter &&
                    candidate.initiationQuarter.year === queryInitiationYear
                  ) {
                    return true;
                  }

                  return false;
                })
              );
            }}
          >
            Search
          </Button>
        </Box>
        <TableContainer
          aria-label='sticky table'
          component={Paper}
          sx={{
            flex: '1 1 auto',
          }}
          size='small'
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeaderCell
                  sx={{
                    left: 0,
                    position: 'sticky',
                    zIndex: '4',
                    borderRight: (theme) =>
                      '1px solid ' + theme.palette.custom2.main,
                  }}
                >
                  Name
                </HeaderCell>
                <HeaderCell>Email</HeaderCell>
                <HeaderCell>Major</HeaderCell>
                <HeaderCell>Initiation Quarter</HeaderCell>
                <HeaderCell>General Social 1</HeaderCell>
                <HeaderCell>General Social 2</HeaderCell>
                <HeaderCell>Tutoring</HeaderCell>
                <HeaderCell>Test Bank</HeaderCell>
                <HeaderCell>Corporate</HeaderCell>
                <HeaderCell>Interview</HeaderCell>
                <HeaderCell>Candidate Quiz</HeaderCell>
                <HeaderCell>Bent Polishing</HeaderCell>
                <HeaderCell>Initiation</HeaderCell>
                <HeaderCell>Membership Fee</HeaderCell>
                <HeaderCell>New Member Form</HeaderCell>
                <HeaderCell>Coffee Chat</HeaderCell>
                <HeaderCell>Academic Outreach</HeaderCell>
                <HeaderCell>Social Media Post</HeaderCell>
                <HeaderCell>Chalking</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedCandidates.map((candidate) => (
                <TableRow
                  key={candidate.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <Cell
                    component='th'
                    scope='row'
                    sx={{
                      left: 0,
                      position: 'sticky',
                      zIndex: '3',
                      backgroundColor: 'white',
                      borderRight: (theme) =>
                        '1px solid ' + theme.palette.custom2.main,
                    }}
                  >
                    {candidate.name.first + ' ' + candidate.name.last}
                  </Cell>
                  <Cell>{candidate.email}</Cell>
                  <Cell>{candidate.major}</Cell>
                  <Cell>
                    {candidate.initiationQuarter?.quarter +
                      ' ' +
                      candidate.initiationQuarter?.year}
                  </Cell>
                  {Object.keys(candidate.requirements).map(
                    (requirement, idx) =>
                      idx < 15 && (
                        <Cell key={requirement}>
                          {candidate.requirements[requirement] ? (
                            <CheckIcon color='secondary' />
                          ) : (
                            ''
                          )}
                        </Cell>
                      )
                  )}
                </TableRow>
              ))}
              <TableRow />
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default CandidateSpreadsheet;

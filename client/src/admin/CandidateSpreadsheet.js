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

function CandidateSpreadsheet() {
  const [candidates, setCandidates] = useState([]);
  const [displayedCandidates, setDisplayedCandidates] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const HeaderCell = styled(TableCell)(({ theme }) => ({
    minWidth: '100px',
    align: 'right',
    backgroundColor: theme.palette.custom.main,
    color: theme.palette.primary.main,
  }));

  const Cell = styled(TableCell)(({ theme }) => ({
    minWidth: '100px',
    align: 'right',
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
          paddingTop: '85px',
          paddingLeft: { xs: '0' },
          paddingRight: { xs: '0' },
          paddingBottom: '55px',
          height: '100vh',
          display: 'flex',
          flexFlow: 'column',
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.custom.main, 0.95),
            borderRadius: '12px',
          }}
          p={5}
          mb={3}
        >
          <Typography
            variant='h2'
            color='primary'
            sx={{
              fontWeight: 'bold',
            }}
            mb={3}
          >
            Candidate Spreadsheet
          </Typography>
          <Typography variant='h4' color='primary' mt={3} mb={1}>
            Search Candidates
          </Typography>
          <input
            type='text'
            id='query-input'
            style={{ fontSize: '1.2rem', marginRight: '12px' }}
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
                candidates
                  ?.map((candidate) => {
                    if (
                      (candidate.name?.first + ' ' + candidate.name?.last)
                        .toLowerCase()
                        .includes(query)
                    ) {
                      return candidate;
                    }
                    if (candidate.email.toLowerCase().includes(query)) {
                      return candidate;
                    }
                    return -1;
                  })
                  .filter((val) => val !== -1)
              );
            }}
          >
            Search
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ flex: '1 1 auto' }}>
          <Table
            stickyHeader
            aria-label='sticky table'
            sx={{
              minWidth: 650,
            }}
            size='small'
          >
            <TableHead>
              <TableRow>
                {/* The following are currently hard coded to match the order in which
                          requirements are outputted from the backend. Ideally we would grab
                          a candidate and just create a Cell for each requirement in the list and
                          parse the requirement name to look pretty. I'm studying for midterms right
                          now though, and I don't have time to implement it.*/}
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Email</HeaderCell>
                <HeaderCell>Graduation Year</HeaderCell>
                <HeaderCell>Major</HeaderCell>
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
                  <Cell component='th' scope='row'>
                    {candidate.name.first + ' ' + candidate.name.last}
                  </Cell>
                  <Cell>{candidate.email}</Cell>
                  <Cell>{candidate.major}</Cell>
                  <Cell>{candidate.graduationYear}</Cell>
                  {Object.keys(candidate.requirements).map((requirement) => (
                    <Cell key={requirement}>
                      {candidate.requirements[requirement] ? (
                        <CheckIcon color='secondary' />
                      ) : (
                        ''
                      )}
                    </Cell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default CandidateSpreadsheet;

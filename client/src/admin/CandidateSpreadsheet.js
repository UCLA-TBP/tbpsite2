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
import { Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import TBPBackground from '../components/TBPBackground';
import _ from 'lodash';

function CandidateSpreadsheet() {
  const [candidates, setCandidates] = useState([]);
  const [displayedCandidates, setDisplayedCandidates] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [startCellId, setStartCellId] = useState(null);
  const [mode, setMode] = useState('add');

  const requirements = [
    'generalSocial1',
    'generalSocial2',
    'tutoring',
    'testBank',
    'corporate',
    'candidateQuiz',
    'bentPolishing',
    'initiation',
    'membershipFee',
    'newMemberForm',
    'coffeeChat',
    'academicOutreach',
    'socialMediaPost',
    'chalking',
    'ethicsChat',
  ];

  const disableHighlight = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (candidateIdx, idx) => {
    setStartCellId(JSON.stringify([candidateIdx, idx]));
    document.addEventListener('selectstart', disableHighlight);
  };

  const handleMouseUp = (candidateIdx, idx) => {
    const startCandidateId = JSON.parse(startCellId)[0];
    const startReqIdx = JSON.parse(startCellId)[1];
    const newSelected = new Set(selectedCells);
    const isFilling = !selectedCells.has(startCellId);
    for (
      let i = Math.min(startCandidateId, candidateIdx);
      i <= Math.max(startCandidateId, candidateIdx);
      i += 1
    ) {
      for (
        let j = Math.min(startReqIdx, idx);
        j <= Math.max(startReqIdx, idx);
        j += 1
      ) {
        const cellID = JSON.stringify([i, j]);
        if (isFilling) {
          newSelected.add(cellID);
        } else {
          newSelected.delete(cellID);
        }
      }
    }
    setSelectedCells(newSelected);
  };

  const handleUpdatePayload = () => {
    const candidateIdxToReqPayload = {};
    selectedCells.forEach((selected) => {
      const cellPos = JSON.parse(selected);
      if (!candidateIdxToReqPayload[cellPos[0]]) {
        candidateIdxToReqPayload[cellPos[0]] = [];
      }
      candidateIdxToReqPayload[cellPos[0]].push(requirements[cellPos[1]]);
    });

    const updates = [];
    for (let [candidateIdx, reqPayload] of Object.entries(
      candidateIdxToReqPayload
    )) {
      const candidate = displayedCandidates[candidateIdx];
      const newRequirements = candidate.requirements;
      reqPayload.forEach((req) => {
        newRequirements[req] = mode === 'add';
      });
      console.log(candidate, newRequirements);
      updates.push(
        axios.put('/api/user/update-user/' + candidate._id, candidate)
      );
    }
    Promise.all(updates)
      .then((responses) => {
        const updatedDisplayedCandidates = displayedCandidates.map(
          (candidate, candidateIdx) => {
            if (!candidateIdxToReqPayload[candidateIdx]) {
              return candidate;
            }
            const reqPayload = candidateIdxToReqPayload[candidateIdx];
            reqPayload.forEach((req) => {
              candidate[req] = mode === 'add';
            });
            return candidate;
          }
        );
        setDisplayedCandidates(updatedDisplayedCandidates);
      })
      .catch((err) => {
        window.alert('Could not commit changes.');
      });
  };

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
            padding: '12px 24px 12px',
          }}
          mb={2}
        >
          <Typography
            variant='h3'
            color='primary'
            sx={{
              fontWeight: 'bold',
            }}
            mb={1.5}
          >
            Candidate Spreadsheet
          </Typography>
          <Typography
            variant='p'
            color='custom2'
            mb={1}
            sx={{ fontSize: '1rem' }}
          >
            Filter by email, name, major, or initiation quarter (e.g. "spring
            2023"). Click or drag along requirements to make changes.
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
              setSelectedCells(new Set());
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            paddingBottom: '0.2rem',
            gap: '0.6rem',
          }}
        >
          <ToggleButtonGroup
            color='secondary'
            size={'small'}
            onChange={(e, newMode) => {
              setMode(newMode);
            }}
            value={mode}
            exclusive
            sx={{
              height: '30px',
              backgroundColor: (theme) =>
                alpha(theme.palette.custom.main, 0.65),
            }}
          >
            <ToggleButton value='add'>Add</ToggleButton>
            <ToggleButton value='del'>Del</ToggleButton>
          </ToggleButtonGroup>
          <Button
            color='secondary'
            variant='contained'
            sx={{
              width: '200px',
              height: '30px',
              marginBottom: '4px',
              marginRight: '12px',
            }}
            onClick={handleUpdatePayload}
          >
            <CheckIcon sx={{ mr: 1 }} />
            Commit Changes
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
                {requirements.map((requirement) => (
                  <HeaderCell>{_.startCase(requirement)}</HeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedCandidates.map((candidate, candidateIdx) => (
                <TableRow
                  key={candidate._id}
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
                  {requirements.map(
                    (requirement, idx) =>
                      idx < 15 && (
                        <Cell
                          key={candidate._id + requirement}
                          onMouseDown={() => {
                            handleMouseDown(candidateIdx, idx);
                          }}
                          onMouseUp={() => {
                            handleMouseUp(candidateIdx, idx);
                          }}
                          sx={{
                            backgroundColor: selectedCells.has(
                              JSON.stringify([candidateIdx, idx])
                            )
                              ? mode === 'add'
                                ? 'lightgreen'
                                : 'pink'
                              : 'white',
                            cursor: 'pointer',
                          }}
                        >
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

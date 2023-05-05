import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import {
  Container,
} from '@mui/material';
import TBPBackground from '../components/TBPBackground';

function CandidateSpreadsheet() {
  const [candidates, setCandidates] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const Cell = styled(TableCell)(({ theme }) => ({
    minWidth: '100px',
    align: "right",
  }))

  useEffect(() => {
    async function fetchCandidates() {
      const response = await axios.get('/api/user/get-candidates');
      const sortedCandidates = response.data.sort((a, b) => (a.name.first + " " + a.name.last).localeCompare(b.name.first + " " + b.name.last));
      setCandidates(sortedCandidates);
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
      <Container sx={{ paddingTop: "150px" }}>
        <TableContainer component={Paper} sx={{ height: "500px" }}>
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} size="small">
              <TableHead>
                  <TableRow>
                      {/* The following are currently hard coded to match the order in which
                          requirements are outputted from the backend. Ideally we would grab
                          a candidate and just create a Cell for each requirement in the list and
                          parse the requirement name to look pretty. I'm studying for midterms right
                          now though, and I don't have time to implement it.*/}
                      <Cell>Name</Cell>
                      <Cell>Email</Cell>
                      <Cell>Graduation Year</Cell>
                      <Cell>Major</Cell>
                      <Cell>General Social 1</Cell>
                      <Cell>General Social 2</Cell>
                      <Cell>Tutoring</Cell>
                      <Cell>Test Bank</Cell>
                      <Cell>Corporate</Cell>
                      <Cell>Interview</Cell>
                      <Cell>Candidate Quiz</Cell>
                      <Cell>Bent Polishing</Cell>
                      <Cell>Initiation</Cell>
                      <Cell>Membership Fee</Cell>
                      <Cell>New Member Form</Cell>
                      <Cell>Coffee Chat</Cell>
                      <Cell>Academic Outreach</Cell>
                      <Cell>Social Media Post</Cell>
                      <Cell>Chalking</Cell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {candidates.map((candidate) => (
                      <TableRow
                          key={candidate.email}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <Cell component="th" scope="row">
                          {candidate.name.first + " " + candidate.name.last}
                      </Cell>
                      <Cell>
                          {candidate.email}
                      </Cell>
                      <Cell>
                          {candidate.major}
                      </Cell>
                      <Cell>
                          {candidate.graduationYear}
                      </Cell>
                      {/*console.log(candidate.requirements*/}
                      {Object.keys(candidate.requirements).map((requirement) => 
                          (
                            <Cell key={requirement}>{candidate.requirements[requirement] ? "X" : ""}</Cell>
                          )
                      )}
                      </TableRow>

                  ))}
              </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );

};

export default CandidateSpreadsheet;

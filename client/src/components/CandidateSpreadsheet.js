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
      setCandidates(response.data);
      setIsLoaded(true);
    }
    fetchCandidates();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper} sx={{ height: "500px", paddingBottom: "100px"}}>
        <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} size="small">
            <TableHead>
                <TableRow>
                    <Cell>Name</Cell>
                    <Cell>Email</Cell>
                    <Cell>Major</Cell>
                    <Cell>Graduation Year</Cell>
                    <Cell>Academic Outreach</Cell>
                    <Cell>Bent Polishing</Cell>
                    <Cell>Candidate Quiz</Cell>
                    <Cell>Chalking</Cell>
                    <Cell>Coffee Chat</Cell>
                    <Cell>Corporate</Cell>
                    <Cell>General Social</Cell>
                    <Cell>General Social 1</Cell>
                    <Cell>General Social 2</Cell>
                    <Cell>Initiation</Cell>
                    <Cell>Interview</Cell>
                    <Cell>Membership Fee</Cell>
                    <Cell>New Member Form</Cell>
                    <Cell>Social Media Post</Cell>
                    <Cell>Test Bank</Cell>
                    <Cell>Tutoring</Cell>
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
                    {Object.keys(candidate.requirements).map((requirement) => (
                        <Cell key={requirement}>{candidate.requirements[requirement] ? "X" : ""}</Cell>
                    ))}
                    </TableRow>

                ))}
            </TableBody>
        </Table>
    </TableContainer>
  );

};

export default CandidateSpreadsheet;

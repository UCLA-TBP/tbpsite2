import React, { useState } from 'react';
import {
  alpha,
  Autocomplete,
  Box,
  Container,
  Link,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import TBPBackground from '../components/TBPBackground';
import LazyExecutor from '../components/LazyExecutor';

const HeaderCell = styled(TableCell)(({ theme }) => ({
  minWidth: '10vw',
  maxWidth: '12vw',
  // width: '12vw',
  // maxWidth: '100px',
  align: 'right',
  backgroundColor: theme.palette.custom.main,
  color: theme.palette.primary.main,
}));

const TitleCell = styled(TableCell)(({ theme }) => ({
  minWidth: '10vw',
  maxWidth: '12vw',
  // width: '12vw',
  // maxWidth: '100px',
  align: 'right',
  backgroundColor: alpha(theme.palette.custom2.main, 0.4),
  fontWeight: 'bold',
}));

function TestBank() {
  const [testData, setTestData] = useState({});
  const [lazyExecutorEnabled, setLazyExecutorEnabled] = useState(true);
  const [showLazyExecutor, setShowLazyExecutor] = useState(true);
  const [batchNum, setBatchNum] = useState(1);
  const batchSize = 100;

  const addTest = (data, subject, classNum, test) => {
    if (!data[subject]) {
      data[subject] = {};
    }
    if (!data[subject][classNum]) {
      data[subject][classNum] = [];
    }
    data[subject][classNum].push(test);
  };

  const getTestBatch = () => {
    console.log('fetching batch');
    setLazyExecutorEnabled(false);
    axios
      .post('/api/pdf/get-all-pdfs', {
        batchSize: batchSize,
        batchNum: batchNum,
      })
      .then((res) => {
        let retrievedData = { ...testData };
        res.data.forEach((test) => {
          if (test.subject && test.classNumber) {
            addTest(retrievedData, test.subject, test.classNumber, {
              cloudinaryURL: test.cloudinaryURL,
              filename: test.filename,
              professor: test.professor,
              testType: test.testType,
              testNum: test.testNum,
            });
          }
        });
        setBatchNum(batchNum + 1);
        setTestData(retrievedData);
        if (res.data.length === batchSize) setLazyExecutorEnabled(true);
        else setShowLazyExecutor(false);
        console.log('resolved');
      })
      .catch((err) => {
        console.log('Error fetching PDFs', err);
      });
  };

  return (
    <>
      <TBPBackground />
      <Container
        sx={{
          padding: { xs: '85px 0', sm: '85px 35px 100px !important' },
          minHeight: '105vh',
          // backgroundColor: (theme) => theme.palette.custom.main,
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.custom.main, 0.95),
            borderRadius: '12px',
          }}
          p={5}
        >
          <Typography
            variant='h2'
            color='primary'
            sx={{
              fontWeight: 'bold',
            }}
            mb={2}
          >
            Test Bank
          </Typography>
          <Typography variant='p' mb={2} color='custom2'>
            Filter by key words, case insensitive. Can search with any
            combination of test kind (eg. Midterm 1), professor, class name,
            quarter, and year
          </Typography>
          <Autocomplete
            disablePortal
            // options={candidates.sort((a, b) => a.name?.last.localeCompare(b.name?.last))}
            getOptionLabel={(candidate) =>
              `${candidate.name?.first} ${candidate.name?.last}`
            }
            onChange={(e, val) => {
              // setSelectedCandidate(val);
            }}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: '0.2rem',
            }}
            // filterOptions={filterOptions}
            isOptionEqualToValue={(option, value) =>
              option.email === value.email
            }
            renderInput={(params) => {
              return <TextField {...params} />;
            }}
          />
        </Box>
        {/* <Typography variant='h2'>Tests</Typography>
        {Object.keys(testData).map((subject) => (
          <div key={subject}>
            <Typography variant='h2' color='primary'>
              {subject}
            </Typography>
            {Object.keys(testData[subject]).map((classNum) => (
              <div key={subject + classNum}>
                <Typography variant='p' color='primary'>
                  {subject} {classNum}
                </Typography>
                {testData[subject][classNum].map((test) => (
                  <div key={test.cloudinaryURL + subject}>
                    <Link
                      color='secondary'
                      target='_blank'
                      href={test.cloudinaryURL}
                    >
                      {test.cloudinaryURL}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))} */}
        <Box pt={3}>
          <TableContainer component={Paper} sx={{ height: '50vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Number</HeaderCell>
                  <HeaderCell>Term</HeaderCell>
                  <HeaderCell>Professor</HeaderCell>
                  <HeaderCell>File</HeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(testData).map((subject) => (
                  <>
                    {Object.keys(testData[subject]).map((classNum) => (
                      <>
                        <TableRow>
                          <TitleCell>
                            {subject} {classNum}
                          </TitleCell>
                          <TitleCell></TitleCell>
                          <TitleCell></TitleCell>
                          <TitleCell></TitleCell>
                          <TitleCell></TitleCell>
                        </TableRow>
                        {testData[subject][classNum].map((test) => (
                          <TableRow key={test.cloudinaryURL + subject}>
                            <TableCell component='th' scope='row'>
                              {test.testType || ''}
                            </TableCell>
                            <TableCell>{test.testNum || ''}</TableCell>
                            <TableCell></TableCell>
                            <TableCell>{test.professor || ''}</TableCell>
                            <TableCell>
                              <Link
                                color='secondary'
                                target='_blank'
                                href={test.cloudinaryURL}
                              >
                                {test.filename}
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                  </>
                ))}
                {/* <TableRow>
                  <TablePagination
                    // count={totalRows}
                    rowsPerPage={batchSize}
                    page={batchNum}
                    // onChangePage={handlePageChange}
                    // onChangeRowsPerPage={handleRowsPerPageChange}
                  />
                </TableRow> */}
              </TableBody>
            </Table>
            <Box>
              <LazyExecutor
                func={getTestBatch}
                enabled={lazyExecutorEnabled}
                show={showLazyExecutor}
              />
            </Box>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}

export default TestBank;

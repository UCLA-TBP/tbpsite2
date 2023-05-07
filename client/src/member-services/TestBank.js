import React, { Fragment, useState } from 'react';
import {
  alpha,
  Box,
  Button,
  Container,
  Link,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import TBPBackground from '../components/TBPBackground';
import LazyExecutor from '../components/LazyExecutor';
import TestForm from '../components/TestForm';

const HeaderCell = styled(TableCell)(({ theme }) => ({
  minWidth: 'calc(min(12vw, 175px))',
  // maxWidth: '10rem',
  // width: '12vw',
  // maxWidth: '100px',
  align: 'right',
  backgroundColor: theme.palette.custom.main,
  color: theme.palette.primary.main,
}));

const TitleCell = styled(TableCell)(({ theme }) => ({
  // minWidth: '10vw',
  // maxWidth: '12vw',
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

  const [testFormData, setTestFormData] = useState({
    subject: '',
    classNumber: '',
    professor: '',
    testType: '',
    testNum: '',
    termQuarter: '',
    termYear: '',
  });

  const addTest = (data, subject, classNum, test) => {
    if (!data[subject]) {
      data[subject] = {};
    }
    if (!data[subject][classNum]) {
      data[subject][classNum] = [];
    }
    data[subject][classNum].push(test);
  };

  const handleSearch = () => {
    getTestBatch({}, 1);
  };

  const getTestBatch = (currentData, batchN) => {
    setLazyExecutorEnabled(false);
    let retrievedData = { ...currentData };
    axios
      .post('/api/pdf/search-pdfs/', {
        batchSize: batchSize,
        batchNum: batchN,
        queryData: { ...testFormData },
      })
      .then((res) => {
        res.data.forEach((test) => {
          if (test.subject && test.classNumber) {
            addTest(retrievedData, test.subject, test.classNumber, {
              cloudinaryURL: test.cloudinaryURL,
              professor: test.professor,
              testType: test.testType,
              testNum: test.testNum,
              term: test.term,
              id: test._id,
            });
          }
        });
        setBatchNum(batchN + 1);
        setTestData({ ...retrievedData });
        if (res.data.length === batchSize) setLazyExecutorEnabled(true);
        else setShowLazyExecutor(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TBPBackground />
      <Container
        sx={{
          padding: { xs: '85px 0', sm: '85px 35px 100px !important' },
          minHeight: '105vh',
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
          <Typography variant='p' color='custom2'>
            Feel free to leave any of the search paramters blank!
          </Typography>
          <TestForm
            testFormData={testFormData}
            setTestFormData={setTestFormData}
          />
          <Button
            color='secondary'
            variant='contained'
            sx={{
              width: '100px',
              height: '30px',
              marginTop: '12px',
              marginBottom: '4px',
              marginRight: '12px',
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            color='secondary'
            variant='outlined'
            sx={{
              width: '100px',
              height: '30px',
              marginTop: '12px',
              marginBottom: '4px',
            }}
            onClick={() =>
              setTestFormData({
                subject: '',
                classNumber: '',
                professor: '',
                testType: '',
                testNum: '',
                termQuarter: '',
                termYear: '',
              })
            }
          >
            Clear
          </Button>
        </Box>
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
                  <Fragment key={subject}>
                    {Object.keys(testData[subject]).map((classNum) => (
                      <Fragment key={classNum}>
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
                          <TableRow key={test.id}>
                            <TableCell component='th' scope='row'>
                              {test.testType || ''}
                            </TableCell>
                            <TableCell>{test.testNum || ''}</TableCell>
                            <TableCell>
                              {test.term
                                ? `${test.term.quarter} ${test.term.year}`
                                : ''}
                            </TableCell>
                            <TableCell>{test.professor || ''}</TableCell>
                            <TableCell>
                              <Link
                                color='secondary'
                                target='_blank'
                                href={test.cloudinaryURL}
                              >
                                {/* {test.filename} */}
                                View
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </Fragment>
                    ))}
                  </Fragment>
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
                func={() => getTestBatch(testData, batchNum)}
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

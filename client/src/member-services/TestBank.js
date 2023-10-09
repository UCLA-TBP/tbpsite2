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
  Tooltip,
  Typography,
} from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import axios from 'axios';
import TBPBackground from '../components/TBPBackground';
import LazyExecutor from '../components/LazyExecutor';
import TestForm from '../components/TestForm';
import MissingTestInfoModal from '../components/MissingTestInfoModal';

const HeaderCell = styled(TableCell)(({ theme }) => ({
  minWidth: 'calc(min(12vw, 175px))',
  align: 'right',
  backgroundColor: theme.palette.custom.main,
  color: theme.palette.primary.main,
}));

const TitleCell = styled(TableCell)(({ theme }) => ({
  align: 'right',
  backgroundColor: alpha(theme.palette.custom2.main, 0.4),
  fontWeight: 'bold',
}));

const MissingInfoPlaceHolder = 'N/A';

function TestBank() {
  const [collapsed, setCollapsed] = useState(false);
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

  const [missingInfoModalOpen, setMissingInfoModalOpen] = useState(false);
  const [missingTestData, setMissingTestData] = useState({
    subject: '',
    classNumber: '',
    professor: '',
    testType: '',
    testNum: '',
    termQuarter: '',
    termYear: '',
  });

  const [noTestsFound, setNoTestsFound] = useState(false);

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
    setTestData({});
    setShowLazyExecutor(true);
    setNoTestsFound(false);
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
        if (res.data.length === batchSize) setLazyExecutorEnabled(true);
        else setShowLazyExecutor(false);
        if (Object.keys(retrievedData).length === 0 && batchN === 1) {
          setNoTestsFound(true);
        }
        setTestData({ ...retrievedData });
        setBatchNum(batchN + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <TBPBackground />
      <Container
        sx={{
          padding: { xs: '80px 0 24px', sm: '80px 35px 24px' },
          height: '100vh',
          display: 'flex',
          flexFlow: 'column',
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.custom.main, 0.95),
            borderRadius: '12px',
            position: 'relative',
            padding: '24px 32px 32px',
          }}
        >
          <Typography
            variant='h2'
            color='primary'
            sx={{
              fontWeight: 'bold',
            }}
            mb={1}
          >
            Test Bank
          </Typography>
          <Typography
            variant='p'
            color='custom2'
            sx={collapsed ? {} : { marginBottom: '-20px' }}
          >
            {collapsed
              ? 'Expand to search for tests!'
              : 'Feel free to leave any of the search parameters blank! Note that some test details are still missing. However, all tests are correctly assigned a subject and class code.'}
          </Typography>
          {!collapsed && (
            <>
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
                  marginTop: '8px',
                  marginBottom: '4px',
                  marginRight: '12px',
                }}
                onClick={() => {
                  handleSearch();
                  setCollapsed(true);
                }}
              >
                Search
              </Button>
              <Button
                color='secondary'
                variant='text'
                sx={{
                  width: '80px',
                  height: '30px',
                  marginTop: '8px',
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
                Reset
              </Button>
            </>
          )}
          <Button
            variant='contained'
            color='secondary'
            sx={{
              position: 'absolute',
              bottom: -2,
              boxShadow: 8,
              left: '50%',
              transform: 'translate(-50%, 0)',
              borderRadius: '24px 24px 0 0',
              borderBottom: '0',
              height: '24px',
            }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <KeyboardDoubleArrowDownIcon
                sx={{
                  position: 'relative',
                  top: '2px',
                  fontSize: 12,
                  transform: 'scale(250%, 150%)',
                  color: (theme) => alpha(theme.palette.custom.main, 0.85),
                }}
              />
            ) : (
              <KeyboardDoubleArrowUpIcon
                sx={{
                  fontSize: 12,
                  transform: 'scale(250%, 150%)',
                  color: (theme) => alpha(theme.palette.custom.main, 0.85),
                }}
              />
            )}
          </Button>
          <MissingTestInfoModal
            open={missingInfoModalOpen}
            setOpen={setMissingInfoModalOpen}
            testData={missingTestData}
            setTestData={setMissingTestData}
            updateCallback={(updatedTest) => {
              updatedTest.term = {
                quarter: updatedTest.termQuarter,
                year: updatedTest.termYear,
              };
              const newTestData = testData;
              newTestData[updatedTest.subject][updatedTest.classNumber] =
                testData[updatedTest.subject][updatedTest.classNumber].map(
                  (test) =>
                    test.id === updatedTest.id
                      ? { ...test, ...updatedTest }
                      : test
                );
              setTestData(newTestData);
            }}
          />
        </Box>
        <TableContainer
          component={Paper}
          mt={3}
          sx={{
            flex: '1 1 auto',
            marginTop: '1.5rem',
          }}
        >
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
                        <Tooltip
                          title='Click to fix missing/incorrect info'
                          enterNextDelay={100}
                          key={test.id}
                        >
                          <TableRow
                            onClick={() => {
                              setMissingTestData({
                                id: test.id,
                                subject: subject,
                                classNumber: classNum,
                                professor: test.professor || '',
                                testType: test.testType || '',
                                testNum: test.testNum || '',
                                termQuarter: test.term?.quarter || '',
                                termYear: test.term?.year || '',
                              });
                              setTimeout(() => {
                                setMissingInfoModalOpen(true);
                              }, 100);
                            }}
                            sx={{ cursor: 'pointer' }}
                          >
                            <TableCell
                              component='th'
                              scope='row'
                              sx={
                                !test.testType
                                  ? {
                                      color: '#dddddd',
                                    }
                                  : {}
                              }
                            >
                              {test.testType || MissingInfoPlaceHolder}
                            </TableCell>
                            <TableCell
                              sx={
                                !test.testNum
                                  ? {
                                      color: '#dddddd',
                                    }
                                  : {}
                              }
                            >
                              {test.testNum || MissingInfoPlaceHolder}
                            </TableCell>
                            <TableCell
                              sx={
                                !test.term
                                  ? {
                                      color: '#dddddd',
                                    }
                                  : {}
                              }
                            >
                              {test.term
                                ? `${test.term.quarter} ${test.term.year}`
                                : MissingInfoPlaceHolder}
                            </TableCell>
                            <TableCell
                              sx={
                                !test.professor
                                  ? {
                                      color: '#dddddd',
                                    }
                                  : {}
                              }
                            >
                              {test.professor || MissingInfoPlaceHolder}
                            </TableCell>
                            <TableCell>
                              <Link
                                color='secondary'
                                target='_blank'
                                href={test.cloudinaryURL}
                              >
                                View
                              </Link>
                            </TableCell>
                          </TableRow>
                        </Tooltip>
                      ))}
                    </Fragment>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
          {noTestsFound && (
            <Typography
              variant='h3'
              sx={{
                textAlign: 'center',
              }}
              mt={3}
            >
              No tests found ...
            </Typography>
          )}
          <Box>
            <LazyExecutor
              func={() => getTestBatch(testData, batchNum)}
              enabled={lazyExecutorEnabled}
              show={showLazyExecutor}
            />
          </Box>
        </TableContainer>
      </Container>
    </>
  );
}

export default TestBank;

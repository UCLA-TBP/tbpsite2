import React, { useState } from 'react';
import {
  Container,
  Link,
  Paper,
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

// TODO maintain sorted orders for subject and classnum, sort tests by recency
// Already sorted by subject in backend, use arrays to maintain current data in frontend
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
          marginTop: '-14px',
          padding: '85px 35px 100px !important',
          minHeight: '105vh',
          backgroundColor: (theme) => theme.palette.custom.main,
        }}
      >
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Term</TableCell>
                <TableCell>Professor</TableCell>
                <TableCell>File</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(testData).map((subject) => (
                <>
                  {Object.keys(testData[subject]).map((classNum) => (
                    <>
                      <TableRow>
                        <TableCell>
                          {subject} {classNum}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
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
            </TableBody>
          </Table>
        </TableContainer>
        <LazyExecutor
          func={getTestBatch}
          enabled={lazyExecutorEnabled}
          show={showLazyExecutor}
        />
      </Container>
    </>
  );
}

export default TestBank;

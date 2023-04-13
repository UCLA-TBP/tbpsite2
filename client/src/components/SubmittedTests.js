import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

function UploadTest({ candidate }) {
  const [testList, setTestList] = useState([]);
  useEffect(() => {
    const getTests = async () => {
      try {
        const promises = candidate.submittedTests?.map(async (testId) => {
          const response = await axios.get('/api/pdf/get-pdf/' + testId);
          return (
            <li key={testId} style={{ color: 'white' }}>
              {' '}
              {response.data.subject +
                '_' +
                response.data.classNumber +
                '_' +
                response.data.professor +
                '.PDF'}
            </li>
          );
        });
        const testItems = await Promise.all(promises);
        setTestList(testItems);
      } catch (error) {
        console.error(error);
      }
    };

    getTests();
  }, [candidate]);

  return (
    <div>
      {testList.length > 0 ? (
        <ul>{testList}</ul>
      ) : (
        <Typography variant='p' mt={2}>
          No tests submitted yet...
        </Typography>
      )}
    </div>
  );
}

export default UploadTest;

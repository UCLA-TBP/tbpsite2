import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

function UploadTest({candidate}) {
    const [testList, setTestList] = useState([]);
    useEffect(() => {
      const getTests = async () => {
        try {
          const promises = candidate.submittedTests?.map(async (testId) => {
            const response = await axios.get('/api/pdf/get-pdf/' + testId);
            return <li key={testId} style={{color: 'white'}}> {
                    response.data.subject + "_" +
                    response.data.classNumber + "_" +
                    response.data.professor + ".PDF"}
                </li>;
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
           <Typography variant='p' mt = {1}>
                Submitted tests:
            </Typography>
            
            <ul>
                {testList}
            </ul>
        </div>
        
    );
};

export default UploadTest;

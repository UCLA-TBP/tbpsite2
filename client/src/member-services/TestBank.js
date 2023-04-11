import React, { useState, useEffect } from 'react';
import axios from 'axios';

/*function TestBank() {
  const [testList, setTestList] = useState([]);
  useEffect(() => {
    const getTests = async () => {
      try {
        const listOfTests = await axios.get('/api/pdf/get-all-PDFs');
        const promises = listOfTests.data.map((test) => {
           DOWNLOAD LINK FOR TEST 
          console.log(test);
          const downloadUrl = `/api/pdf/${test._id}/download`;
          return (
            <li key={test._id}>
              <a href={downloadUrl} 
              
                 download= {test.data.subject + "_" +
                 test.data.classNumber + "_" +
                 test.data.professor + ".PDF"}>

                {test.data.subject + "_" +
                 test.data.classNumber + "_" +
                 test.data.professor + ".PDF"}

              </a>
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
  }, []);

  return (
    <div>
      <Typography variant='p' mt = {1}>
          Test Bank
      </Typography>
      
      <ul>
          {testList}
      </ul>
    </div>
  )
}*/

function TestBank() {
  const [tests, setTests] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchTests() {
      const response = await axios.get('/api/pdf/get-all-PDFs');
      const testList = response.data;
      setTests(testList);
      setIsLoaded(true);
    }
    fetchTests();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Tests</h2>
      <ul>
        {tests.map((test) => (
          <li key={test._id} style={{ color: 'white' }}>
            {test.subject}, {test.classNumber}, {test.professor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestBank;

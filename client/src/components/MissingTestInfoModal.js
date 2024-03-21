import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import TestForm from './TestForm';
import axios from 'axios';

const MissingTestInfoModal = ({
  open,
  setOpen,
  testData,
  setTestData,
  updateCallback,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const isOpen = useRef(false);

  const handleSubmit = () => {
    setLoading(true);
    axios
      .post('/api/pdf/update-pdf', {
        updatedData: testData,
      })
      .then((res) => {
        updateCallback(testData);
        setOpen(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        setLoading(false);
      });
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    axios
      .post('/api/pdf/delete-pdf-by-id', { pdfId: testData.id })
      .then((res) => {
        setOpen(false);
        setLoadingDelete(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        setLoadingDelete(false);
      });
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (!isOpen.current) return;
      const rect = document.getElementById('modal-box').getBoundingClientRect();
      if (
        e.clientX < rect.x ||
        e.clientX > rect.x + rect.width ||
        e.clientY < rect.y ||
        e.clientY > rect.y + rect.height + 100
      ) {
        setOpen(false);
      }
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setOpen]);

  useEffect(() => {
    isOpen.current = open;
  }, [open]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        id='modal-box'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: { xs: 300, sm: 400, lg: 550 },
          borderRadius: '12px',
          boxShadow: 24,
          p: 4,
          backgroundColor: (theme) => theme.palette.custom.main,
        }}
      >
        <Typography variant='h2' color='secondary' mb={3}>
          Thanks for your help!
        </Typography>
        <Typography variant='p' color='primary'>
          Please fill in any incorrect or missing information for this test.
        </Typography>
        <TestForm
          testFormData={testData}
          setTestFormData={setTestData}
          fullWidth
        />
        <Button
          variant='contained'
          color='secondary'
          sx={{ marginTop: '12px' }}
          onClick={handleSubmit}
        >
          {loading ? (
            <CircularProgress
              size='1.4rem'
              sx={{ color: '#000', marginLeft: '2rem', marginRight: '2rem' }}
            />
          ) : (
            'Submit'
          )}
        </Button>
        <Button
          color='secondary'
          variant='text'
          sx={{
            width: '80px',
            height: '30px',
            marginTop: '12px',
            marginBottom: '4px',
          }}
          onClick={() =>
            setTestData({
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

        <Button
          color='secondary'
          variant='contained'
          sx={{
            marginTop: '12px',
            float: 'right',
          }}
          onClick={handleDelete}
        >
          {loadingDelete ? (
            <CircularProgress
              size='1.4rem'
              sx={{ color: '#000', marginLeft: '2rem', marginRight: '2rem' }}
            />
          ) : (
            'Delete'
          )}
        </Button>

      </Box>
    </Modal>
  );
};

export default MissingTestInfoModal;
